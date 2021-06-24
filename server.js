// add express, session, and express-handlebars
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

// console.log(process.env)
// set up app and PORT
const app = express();
const PORT = process.env.PORT || 3001;

// setup sequelize
const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//set up our session
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

const helpers = require('./utils/helpers')

//set up our handle bars view object

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});