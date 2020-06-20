const express = require('express');
//const controllers = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

//app.use(express.json()); //necessary for POST so uncomment it once the POST route is defined
app.use(express.urlencoded({ extended: true }));

// turn on routes
//app.use(controllers);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});