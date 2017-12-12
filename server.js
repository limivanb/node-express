const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;  // set by heroku

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');

app.use( (request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;

  console.log(log);
  fs.appendFileSync('server.log', log + '\r\n', (error) => {
    if (error){
      console.log('Unable to append to server.log');
    }
  });

  next();
});

// app.use((request, response, next) => {
//   response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (request, response) => {
  // response.send('<h1>Hello Express using Node.js</h1>');
  // response.send({
  //   name: 'Ivan',
  //   email: 'ivan.lim@jblfmu.edu.ph',
  //   age: 33,
  //   programming: ['PHP', 'Node.js', 'C/C++', 'VB.NET']
  // });

  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (request, response) => {
  // response.send('<h2>About Page</h2>');
  response.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (request, response) =>{
  response.send({
    errorMessage: 'Bad Page'
  })
});

app.listen(port, (error) => {
  console.log(`Listening to port ${port}`);
});
