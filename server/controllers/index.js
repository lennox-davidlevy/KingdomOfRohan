const express = require('express');
let app = express();
const fs = require('fs');
const parser = require('body-parser');
const axios = require('axios');
let authenticate = require('./../db/index').authenticate
let signup = require('./../db/index').signup
let save = require('./../db/index').save
let histSave = require('./../db/index').histSave;
let fetchHist = require('./../db/index').fetchHist
let moodSearch = require('./../db/index').moodSearch
const checkUser = require('./../db/index').checkUser;

const addSchedule = require('./../db/index').addSchedule;
const getSchedule = require('./../db/index').getSchedule;
const session = require('express-session');
const cookieParser = require('cookie-parser');

const pullDataFromCSV = require('../../client/components/Tree/helpers/pullDataFromCSV.js');

let API_KEY
try {
  API_KEY = require('../../config.js').API_KEY
} catch(err) {
  API_KEY = process.env.API_KEY
}

//mailer
const { transporter, createMailer } = require('./nodeMailerHelper.jsx');
const config = require('../../config.js');




const helpers = require('./serverhelpers.js');
const refreshRouter = require('./refreshRouter.js')

//********middleware and plugins*********
app.use(parser.json());
app.use(express.static(__dirname + '/../../dist'));
app.use(cookieParser());
app.use(session({
  secret: 'secret!',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 6000000}
}));

//*******GET/POST section*******

//profile search - example url: localhost:8080/search/?input=batman+begins
app.get('/search', (req, res) => {
  let movie = req.query.title
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${ API_KEY }&language=en-US&page=1&include_adult=false&query=${movie}`)
    .then((response) => {
      let filtered = helpers.filterResults(response.data.results);
      res.status(200).send(filtered);
    })
    .catch((err) => console.log(err));
});

//takes in a movie object that contains an array of moods
//saves that movie to both the user's history
//and updates the movie's mood count on the global db
app.post('/save', (req, res) => {
  save(req.body, (err) => {
    if (err) console.error(err)
    else {
      histSave(req.body, (err, response) => {
        if (err) console.error(err)
        else res.status(200).send(req.body);
      })
    }
  })
});

// tree component is requesting csv file information
// example url: localhost:8080/csv/?mood=intense

app.get('/csv/:mood?', (req, res) => {
  let mood = req.query.mood;

  pullDataFromCSV(`../data/movies/${mood}Movies.csv`, (err, data) => {
    if (err) res.status(500).send(err);
    else res.setMaxListeners(201).send(data);
  });
});

//*******Global Querying by Mood*******

//mood search - example url: localhost:8080/results/?moods=happy+sad+cool
app.get('/results/:moods?', (req, res) => {
  //creating an array with each mood that was sent with query
  var moods = req.query.moods.split(' ');

  moodSearch(moods, function (err, data) {
    if (err) throw (err);
    res.send(data);
  })
});

//*****Single User Functionality ******/

//get history for dynamic username parameter
//example url: localhost:8080/users/history/?username=parker
//fetches the user's history array and sends back to client
app.get('/users/history/:username?', (req, res) => {
  //this is how you grab the username from the url
  console.log('username searching for: ', req.query.username);
  fetchHist(req.query.username).then(history => res.send(history))
});

//gets the recommendations for a particular user based on their most recently watched movie
app.get('/users/recs.:username', (req, res) => {
  console.log('Getting recs for: ', req.query.username);

  //use helper function here to filter rec list that comes from DB
  fetchHist(req.query.username).then(history => helpers.filterRecs(history, function (err, data) {
    if (err) throw (err);
    res.send(data);
  }))

})

//*******Authentication section*******
//runs authenticate based on object containing un/pw from client
//on the returned docs, compares against the docs password with provided password
//sends back boolean to allow user access or not
app.post('/login', (req, res) => {
  let username = req.body.username;
  authenticate(username, (err, data) => {
    if (err) {
      console.log('Error in the db retrieval '. err)
    }
    else {
      if (data === null) {
        res.send(false)
      } else if (Object.keys(data).length > 1 && data.password === req.body.password) {
        req.session.regenerate(() => {
          req.session.username = username;
          res.send(req.session);
        })
      } else {
        res.send(false)
      }
    }
  })
})




//runs the signup function with info provided from an object from client
//sends back OK on success
app.post('/signup', (req, res) => {
  signup({username: req.body.username, password: req.body.password}, (err, response) => {
    if (err) console.log(err)
    else {
      req.session.regenerate(() => {
        req.session.username = req.body.username;
        res.send(req.session);
      })
    }
  })
})


app.get('/authenticate', (req, res) => {
  //authenticate session
  res.send({
    status: req.session.username ? !!req.session.username : false,
    user: req.session.username || null
  });
});

app.post('/logout', (req, res) => {
  //destroy session
  req.session.destroy();
});



//-----------------------Mailer-SPAM----------------------//

app.post('/sendEmailNew', (req, res) => {
  var poster = 'https://image.tmdb.org/t/p/w500' + req.body.movie.poster_path;
  var time = req.body.time;
  var title = req.body.movie.original_title;
  var message = req.body.message || `Want to watch ${title} with me?`;
  if (req.body.user === 'global') {
    var user = 'Somebody';
  } else {
    var user = req.body.user;
  }
  var mailOptions = createMailer(req.body.email, `${user} wants to watch a movie with you!`, `<img src="${poster}"/> <p>${user} wants to watch <strong>${title}</strong> with you at ${time}, what do you say?</p> <p>Their message: ${message}</p>`);
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('email sent: ' + info.response);
    }
  });
});


app.post('/sendEmailUser', (req, res) => {
  var poster = 'https://image.tmdb.org/t/p/w500' + req.body.movie.poster_path;
  var time = req.body.time;
  var title = req.body.movie.original_title;
  var message = req.body.message || `You have a new notification to watch ${title}!`;
  if (req.body.user === 'global') {
    var user = 'Somebody';
  } else {
    var user = req.body.user;
  }
  var mailOptions = createMailer(req.body.email, `${user} wants to watch a movie with you!`, `<img src="${poster}"/> <p>${user} wants to watch <strong>${title}</strong> with you at ${time}, what do you say?</p> <p>Their message: ${message}</p>`);
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('email sent: ' + info.response);
    }
  });
});


app.get('/checkUser', (req, res) => {
  checkUser(req.query.email, (response) => {
    if (response === 0) {
      res.send({
        exists: false
      });
    } else {
      res.send({
        exists: true
      });
    }
  });
});

app.post('/updateSchedule', (req, res) => {
  console.log('updateSched server fired');
  var title = req.body.movie.original_title;
  var poster = 'https://image.tmdb.org/t/p/w500' + req.body.movie.poster_path;
  var time = req.body.time;
  var invitees = req.body.invitees;
  addSchedule(title, poster, time, invitees, (response) => {
    console.log('server response from db:', response);
  });
});

app.get('/getSchedule', (req, res) => {
  console.log('server user:', req.query.user);
  getSchedule(req.query.user, (results) => {
    res.send(results);
  });

});




//this route is used to handle the refresh button of the browser. With React Router front end,
//this is necessary to enable refreshing of the page
app.use('/', refreshRouter);

//*******server startup********
let port = process.env.PORT || 8080;
app.listen(port, () => console.log('listening in on port: ', port));
