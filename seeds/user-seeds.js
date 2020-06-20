const { User } = require('../models');

const userData = [
  {
    username: 'niru',
    email: "n@gmail.com",
    password: 'nirupama'
    
  },
  {
    username: 'jakob',
    email: "j@gmail.com",
    password: '123456'
  },
  {
    username: 'Dan',
    email: "d@gmail.com",
    password: 'password'
  },
  {
    username: 'bob',
    email: "bob@gmail.com",
    password: 'bob123'
  },
  {
    username: 'Sarah',
    email: "sarah@gmail.com",
    password: 'sarah123'
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;