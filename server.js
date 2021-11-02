// using Handlebars.js as the templating language, Sequelize as the ORM, and the 
//express-session npm package for authentication.

// GIVEN a CMS-style blog site
  // WHEN I visit the site for the first time
    // THEN I am presented with the homepage, which includes existing blog posts if any
    // have been posted; navigation links for the homepage and the dashboard; and the 
    //option to log in
  // WHEN I click on the homepage option
    // THEN I am taken to the homepage
  // WHEN I click on any other links in the navigation
    // THEN I am prompted to either sign up or sign in
  // WHEN I choose to sign up
    // THEN I am prompted to create a username and password
  // WHEN I click on the sign-up button
    // THEN my user credentials are saved and I am logged into the site
  // WHEN I revisit the site at a later time and choose to sign in
    // THEN I am prompted to enter my username and password
  // WHEN I am signed in to the site
    // THEN I see navigation links for the homepage, the dashboard, and the option to log
    // out
  // WHEN I click on the homepage option in the navigation
    // THEN I am taken to the homepage and presented with existing blog posts that
    // include the post title and the date created
  // WHEN I click on an existing blog post
    // THEN I am presented with the post title, contents, post creator’s username, and
    // date created for that post and have the option to leave a comment
  // WHEN I enter a comment and click on the submit button while signed in
    // THEN the comment is saved and the post is updated to display the comment, the
    // comment creator’s username, and the date created
  // WHEN I click on the dashboard option in the navigation
    // THEN I am taken to the dashboard and presented with any blog posts I have already
    // created and the option to add a new blog post
  // WHEN I click on the button to add a new blog post
    // THEN I am prompted to enter both a title and contents for my blog post
  // WHEN I click on the button to create a new blog post
    // THEN the title and contents of my post are saved and I am taken back to an updated
    // dashboard with my new blog post
  // WHEN I click on one of my existing posts in the dashboard
    // THEN I am able to delete or update my post and taken back to an updated dashboard
  // WHEN I click on the logout option in the navigation
    // THEN I am signed out of the site
  // WHEN I am idle on the site for more than a set time
    // THEN I am able to view comments but I am prompted to log in again before I can
    // add, update, or delete comments

//Tech Stack
//handlebars.js
//sequelize
//express
//express-session
//mysql2
//dotenv
//bcrypt
//connect session sequelize

//  Use MVC file structure

////////////////////////////////////////////////////////////////////////////////////////////////////
//  Requiring stuff in.
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

//  Telling sequelize to require the connection info in theconfig folder
const sequelize = require('./config/connection');
//  Initializing sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//  Defining exress
const app = express();
//  Telling it what port to listen to
const PORT = process.env.PORT || 3001;

//  Creating helpers with express handle bars
const hbs = exphbs.create({ helpers });

//  I believe this is making a new session when someone is logged in
//  TODO: Look into what this is doing more
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

//  Telling express to use to use session and the sess variable
app.use(session(sess));

//  setting up the handle bars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//  Telling express to use the routes
app.use(routes);

//  Syncing sequelize
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
