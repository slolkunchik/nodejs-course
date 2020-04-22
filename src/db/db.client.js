const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const users = [
  new User({ name: 'admin', login: 'admin', password: 'admin' }),
  new User({ name: 'user1', login: 'user1', password: 'user1Pass' })
];

const boards = [
  new Board({
    title: 'rss team',
    columns: [{ title: 'tasks to do 1', order: 1 }]
  }),
  new Board({
    title: 'work',
    columns: [{ title: 'tasks to do 2', order: 2 }]
  })
];

const tasks = [
  new Task({ title: 'task1', order: 1, description: 'add headers' }),
  new Task({ title: 'task2', order: 2, description: 'add body' })
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
    db.dropDatabase(() => {
      User.insertMany(users);
      Board.insertMany(boards);
      Task.insertMany(tasks);
      callback();
    }); // delete previous data from DB;
  });
};

module.exports = connectToDB;
