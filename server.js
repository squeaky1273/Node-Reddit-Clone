// Require Libraries
const express = require('express');

// App Setup
const app = express();

// Somewhere near the top
app.use(express.static('public'))

// Middleware
const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  // render the main view
  res.render('home');
})

app.listen(3000, () => {
  console.log('Reddit clone on port localhost:3000!');
});