const express = require('express');
let app = express();
const parser = require('body-parser');
const axios = require('axios');
let authenticate = require('./../db/index').authenticate
let signup = require('./../db/index').signup
let save = require('./../db/index').save
let histSave = require('./../db/index').histSave
let fetchHist = require('./../db/index').fetchHist
let moodSearch = require('./../db/index').moodSearch
let API_KEY
try {
  API_KEY = require('../../config.js').API_KEY
} catch(err) {
  API_KEY = process.env.API_KEY
}
const helpers = require('./serverhelpers.js');
const refreshRouter = require('./refreshRouter.js')

//********middleware and plugins*********
app.use(parser.json());
app.use(express.static(__dirname + '/../../dist'));

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
        res.send(true)
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
      res.send()
    }
  })
})


//this route is used to handle the refresh button of the browser. With React Router front end,
//this is necessary to enable refreshing of the page
app.use('/', refreshRouter);

//*******server startup********
let port = process.env.PORT || 8080;
app.listen(port, () => console.log('listening in on port: ', port));