import { readdirSync, readFileSync, writeFileSync } from 'fs';

const wordlistsFilePath = '/category-wordlists/'
const wordlists = readdirSync(__dirname + `/..${wordlistsFilePath}`);

let allWords = new Set();

wordlists.forEach(wordlist => {
  const words = readFileSync(__dirname + `/..${wordlistsFilePath}` + wordlist, 'utf8').split('\n');
  words.forEach(word => {
    allWords.add(word);
  });
});

writeFileSync(__dirname + '/../freeBrunch_all_gaming_wordlist.txt', Array.from(allWords).join('\n'));