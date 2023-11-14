const fs = require('fs');

const wordlistsFilePath = '/category-wordlists/'
const wordlists = fs.readdirSync(__dirname + `/..${wordlistsFilePath}`);

let allWords = new Set();

wordlists.forEach(wordlist => {
  const words = fs.readFileSync(__dirname + `/..${wordlistsFilePath}` + wordlist, 'utf8').split('\n');
  words.forEach(word => {
    allWords.add(word);
  });
});

fs.writeFileSync(__dirname + '/../freeBrunch_all_gaming_wordlist.txt', Array.from(allWords).join('\n'));