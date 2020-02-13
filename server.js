// Require Libraries
const express = require('express');

require('dotenv').config();

// App Setup
const app = express();

var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); // Add this after you initialize express.

// Add after body parser initialization!
app.use(expressValidator());

// Somewhere near the top
app.use(express.static('public'))

// Middleware
const exphbs  = require('express-handlebars');

// Set db
require('./data/reddit-db');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/posts/new', (req, res) => {
  // render the post view
  res.render('posts-new');
})

//Controllers
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

app.listen(3000, () => {
  console.log('Reddit clone on port localhost:3000!');
});

module.exports = app;