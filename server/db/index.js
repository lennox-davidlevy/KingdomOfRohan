const mongoose = require('mongoose')
let db = require('./models/index').db
let User = require('./models/index').User
let Movie = require('./models/index').Movie
let Schedule = require('./models/index').Schedule

//Queries db by username, fetches their password field, and hands off
let authenticate = (username, cb) => {
    User.findOne({username: username}, `password`, (err, docs) => {
        if (err) cb(err)
        else cb(null, docs)
    })
}

//creates a new user in the User table, hands off
let signup = (info, cb) => {
    let user = new User({
        username: info.username,
        password: info.password,
        history: [null]
    });
    user.save();
    cb(null)
}
//Basic moodSearch query that takes a set of moods,
//queries the Movie database for the moods passed
//in the moodArr and then passes the result into
//the passed in callback cb
let moodSearch = (moodArr, cb) => {
  console.log ('moodArr: ', moodArr);
  if (!moodArr [1]) {moodArr[1] = moodArr[0]}
  if (!moodArr [2]) {moodArr[2] = moodArr[1]}
  Movie
  .where(moodArr[0]).ne(undefined).sort({test: -1})
  .where(moodArr[1]).ne(undefined).sort({test: -1})
  .where(moodArr[2]).ne(undefined).sort({test: -1})
  .then(function (response) {
    // console.log ('Response: ', response.slice (0,4));
    cb (null, response.slice(0, 4));
  })
//  .catch (function (err) {
//    console.log (err);
//  }).where (moodArr[1]).ne(undefined)
//  .then(function (response) {
//    console.log (response.slice (0,4));
//    if (moodArr[2]) {
//      return response;
//    }
//    cb (response.slice(0, 4));
//  })

}

//Queries GlobalMovies db by title (info is object passed from server)
//If null (movie not in database), runs newMovie function
//If not null (movie is in database), runs updateMovie function
//either way, hands off
let save = (info, cb) => {
    Movie.findOne({original_title: info.original_title}, (err, docs) => {
        if (err) console.log('error retrieving movie', err)
        else {
            if (docs === null) {
                newMovie(info, (err) => {
                    if (err) cb(err)
                    else {
                        cb(null)
                    }
                })
            } else {
                updateMovie(docs, info, (err) => {
                    if (err) cb(err)
                    else (cb(null))
                })
            }
        }
    })
}

//takes in a movie object, and creates a blank object, 'spec'
//attach each mood from movie object to the spec
//then adds the other movie info to it
//finally, saves this as a new Movie, and hands off
let newMovie = (info, cb) => {
    console.log('we saving a new movie!')
    let spec = {};
    info.moods.forEach((mood) => {
        spec[mood] = 1
    })
    spec.original_title = info.original_title;
    spec.poster_path = info.poster_path;
    spec.id = info.id;
    spec.overview = info.overview;
    spec.release_date = JSON.parse(info.release_date);
    let movie = new Movie(spec)
    movie.save();
    cb(null)
}

//takes in docs (from parent function query) and a movie object (passed from server).
//goes thru the moods array on the movie object, plussing their value on the docs
//or setting to 1 (meaning this movie has not been tagged with that mood before).
//finally, updates that movie's fields, and hands off
let updateMovie = (docs, info, cb) => {
    info.moods.forEach((mood) => {
        if (docs[mood]) {
            docs[mood]++
        }
        else docs[mood] = 1
    });
    Movie.findOneAndUpdate({id: docs.id}, docs, {upsert: true}, (err, document) => {
        if (err) cb(err)
        else cb(null, document)
    })
}

//takes in a movie object with username (passed from server) and queries db
//pushes old history into new array. lops off null if present
//updates the user's history array, and hands off
let histSave = (info, cb) => {
    User.findOne({username: info.current_user}, (err, docs) => {
        if (err) cb(err)
        else {
            let newHist = [];
            let dupeFound = false
            docs.history.forEach((hist) => {
                if (hist !== null) {
                    if (hist.original_title !== info.original_title) {
                        newHist.push(hist)
                    } else {
                        info.moods.forEach((mood) => {
                            if (!hist.moods.includes(mood)) hist.moods.push(mood)
                        })
                        newHist.push(hist)
                        dupeFound = true
                    }
                }
            })
            if (!dupeFound) {
                newHist.push(info)
            }
           if (newHist[0] === null) newHist = newHist.slice(1)
            User.findOneAndUpdate({username: docs.username}, {history: newHist}, (err, response) => {
                if (err) cb(err)
                else cb(null)
            })
        }
    })
}


const checkUser = (email, callback) => {
  User.count({username: email}, (err, count) => {
    if(err) {
      callback(err);
    } else {
      callback(count);
    }
  })
}

const addSchedule = (movieTitle, poster, time, invitees, callback) => {
  console.log('addsched db fired');
  let newSchedule = new Schedule({
    movieTitle: movieTitle,
    poster: poster,
    time: time,
    invitees: invitees
  });
  newSchedule.save((err) => {
    if (err) {
      callback(err)
    }
  })
}

//takes in a username (passed from server) and quries the db
//hands back the history array from the received docs
let fetchHist = async (un) => {
    let data = await User.findOne({username: un})
    return data.history
}






module.exports.checkUser = checkUser
module.exports.authenticate = authenticate
module.exports.signup = signup
module.exports.save = save
module.exports.histSave = histSave
module.exports.fetchHist = fetchHist
module.exports.moodSearch = moodSearch
module.exports.addSchedule = addSchedule
