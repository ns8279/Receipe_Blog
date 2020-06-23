const express = require('express');
const controllers = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
//============handlebars=====================================
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
//=========== Session =======================================
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUnitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); //necessary for POST so uncomment it once the POST route is defined
app.use(express.urlencoded({ extended: true }));
//============ static folder ===================================
app.use(express.static(path.join(__dirname, 'public')));
//======== session path =============================================
app.use(session(sess));
//============= handlebars engine ==============================
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(controllers);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});