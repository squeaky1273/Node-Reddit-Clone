// Require Libraries
const express = require('express');

// App Setup
const app = express();

//Controllers
require('./controllers/posts.js')(app);

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.get('/', (req, res) => {
  // render the main view
  res.render('home');
})
app.get('/posts/new', (req, res) => {
  // render the post view
  res.render('posts-new');
})

app.listen(3000, () => {
  console.log('Reddit clone on port localhost:3000!');
});