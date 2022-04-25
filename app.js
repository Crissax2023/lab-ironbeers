const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
  hbs.registerPartials(__dirname+"/views/partials")
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers',(req, res,next) => {
  punkAPI.getBeers().then(
    response => {
      console.log("response",response)
      res.render('beers',{beers:response})
    }
  ).catch(
    error =>{
      console.log(error);
      res.send("Error")
    }
  )
  //res.render('beers');
})

app.get('/random_beer',(req, res) => {
  //res.render('random_beer');
  punkAPI.getRandom().then(
    response => {
      console.log("response",response)
      res.render('beers',{beers:response})
    }
  ).catch(
    error =>{
      console.log(error);
      res.send("Error")
    }
  )
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));