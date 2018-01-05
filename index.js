const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');

// Middlewares (MWs)
// Logger MW
app.use((req, res, next) => {
    const now = new Date().toString();
    const logLine = `${now}: ${req.method} ${req.url}`;
    
    console.log(logLine);
    fs.appendFile(`${__dirname}/logs/server.log`, logLine + '\n', (err) => {
        if (err) {
            console.log('Unable to write to server logs!');
        }
    });
    
    next();
});

// Maintenance MW -- Uncomment the code below to put the site on maintenance!
// app.use((req, res, next) => {
//     res.render('maintenance'); 
// });

// Static MW
app.use(express.static(`${__dirname}/public`));

hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hare Krishna!'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Us!'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', {
        pageTitle: 'Projects'
    });
});

app.listen(port, () => {
    console.log(`Node web server listening at ${port}!`);
});