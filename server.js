const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
    var now = new Date().toString();
    fs.appendFile('server.log', `${now}:${req.method} ${req.url}` + '\n', (err) => {
        if(err) {
            console.log('Unable to append log to the server');
        }
    });    
    next();    
});

app.use((req,res,next) => {
    res.render('maintainance.hbs');
});

hbs.registerHelper('getFullYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
}); 

app.get('/', (req,res) => {
    // res.send('<h2>Hello world!</h2>');
    res.render('home.hbs',{
        userName :'Akshay',
        pageTitle : 'Home',        
    });
});

app.get('/about', (req,res) => {
    // res.send('About Page');
    res.render('about.hbs',{
        pageTitle : 'About Page',        
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage : 'Bad request.'
    })
});

app.listen(3000,() => {
    console.log('Server is running on port 3000');
});