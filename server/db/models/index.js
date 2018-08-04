const mongoose = require ('mongoose');

mongoose.connect(`mongodb://KingTheoden:KingTheoden1@ds139921.mlab.com:39921/moodvie-db`)

let db = mongoose.connection;
db.once('open', () => {
   console.log('the database is up and running')
})
/*
mlab login info:
parkermuir
moodvie1
*/

// stores the username, password and history of that user's watched movies and what they tagged them with
let UserSchema = mongoose.Schema ({
  username: {type: String,
             uniq: true},
  password: String,
  history: {type: Array,
			default: [],
			required: true}
})


// Lists the information from the API about the movie
// Also lists the total times a movie has been listed with a given mood
let MovieSchema = mongoose.Schema ({
  id: Number,
  original_title: String,
  poster_path: String,
  release_date: Number,
  overview: String,
  whimsical: Number,
	intense: Number,
	thriller: Number,
	heartfelt: Number,
	gripping: Number,
	boring: Number,
	thoughtProvoking: Number,
	uplifting: Number,
	light: Number,
	tearJerker: Number,
	challenging: Number,
	mindScrew: Number,
	nostalgic: Number,
	powerful: Number,
	despair: Number,
	exhausting: Number,
	paranoid: Number,
	motivated: Number,
	uncomfortable: Number

})

let ScheduleSchema = mongoose.Schema ({
  id: Number,
  movieTitle: String,
  poster: String,
  time: String,
  invitees: [String],
  accepted: [String],
  cancelled: [String],
});





let Schedule = mongoose.model('Schedule', ScheduleSchema);
let User = mongoose.model('User', UserSchema);
let Movie = mongoose.model ('Movie', MovieSchema);
module.exports.db = db;
module.exports.User = User;
module.exports.Movie = Movie;
module.exports.Schedule = Schedule;
