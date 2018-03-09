const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors')
const jokes = require('one-liner-joke');
const serveStatic = require('serve-static');

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(serveStatic('bgimages'));


// app.get('/', (req, res) => {
//     res.send('hello world')
// })

app.get('/getRandomJoke', (req, res) => {
    let noQuotes = jokes.getRandomJoke();
    noQuotes.body = noQuotes.body.replace(/&quot;/g, '"').replace(/&amp;/g, '&')
    if (noQuotes.tags.includes("black" || "racist")) {
        noQuotes.body = "No Joke for You!"
        res.send(noQuotes);
    } else {
        res.send(noQuotes);
    }
})

app.get('/getTagJoke', (req, res) => {
    let noQuotes = jokes.getRandomJokeWithTag(req.query.tag)
    // remove the ""  and & problem text
    noQuotes.body = noQuotes.body.replace(/&quot;/g, '"').replace(/&amp;/g, '&')
    //minimize the crap jokes
    if (noQuotes.tags.includes("black" || "racist")) {
        noQuotes.body = "No Joke for You!"
        res.send(noQuotes);
    } else {
        res.send(noQuotes);
        console.log("served tag joke ", req.query.tag, noQuotes)
    }
})

app.get('/AllTagJokes', (req, res) => {
    res.send(jokes.getAllJokesWithTag(req.query.tag))
})

app.listen(5000, () => {
    console.log("listening on http://localhost:5000")
})