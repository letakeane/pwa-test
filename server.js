const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const requireHTTPS = (request, response, next) => {
  if (request.header('x-forwarded-proto') != 'https') {
    return response.redirect(`https://${request.header('host')}${request.url}`);
  }
  next();
};

if (process.env.NODE_ENV === 'production') { app.use(requireHTTPS); }

app.set('port', process.env.PORT || 3000);
app.locals.title = 'pw8ball';

app.use(express.static('public'));
app.use(bodyParser.json());

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is now running on localhost:${app.get('port')}!`)
})

module.exports = app;
