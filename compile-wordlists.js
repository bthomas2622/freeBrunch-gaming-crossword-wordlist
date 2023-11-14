// combine all the wordlists and write to freebrunch_all_gaming_wordlist.txt

const fs = require('fs');
const wordlists = fs.readdirSync(__dirname + '/../wordlists');

let allWords = [];
