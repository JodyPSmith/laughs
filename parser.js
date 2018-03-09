
//used to get the tags out of the main npm file. need to convert to an array for map to work, also remove black and racist jokes manually

const fs = require('fs');
const jokeFile = fs.readFileSync('node_modules/one-liner-joke/jokes.json')
const jokes = JSON.parse(jokeFile);

function onlyUnique(value, index, self) {
     
    return self.indexOf(value) === index;
}

var tagsArray = [];

for (var i = 0; i < jokes.length; i++) {
    tagsArray = tagsArray.concat(jokes[i].tags)
}

var unique = tagsArray.filter(onlyUnique);
fs.writeFileSync('./laughs/src/tags.json', JSON.stringify(unique));
console.log("this is the tags array " , unique);
