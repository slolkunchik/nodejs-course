const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');

const users = [
  new User({ name: 'admin', login: 'admin', password: 'adminPass' }),
  new User({ name: 'user1', login: 'user1', password: 'user1Pass' })
];

const connectToDB = callback => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log("we're connected to DB!");
    db.dropDatabase(); // delete previous data from DB;
    User.insertMany(users);
    callback();
  });
};

module.exports = connectToDB;
