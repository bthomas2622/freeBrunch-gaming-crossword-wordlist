import { readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wordlistsFilePath = '/category-wordlists/'
const wordlists = readdirSync(__dirname + `/..${wordlistsFilePath}`);

let allWords = new Set();

wordlists.forEach(wordlist => {
  const words = readFileSync(__dirname + `/..${wordlistsFilePath}` + wordlist, 'utf8').split('\n');
  words.forEach(word => {
    allWords.add(word);
  });
});

writeFileSync(__dirname + '/../freeBrunch_all_gaming_wordlist.txt', Array.from(allWords).sort().join('\n'));

console.log('All wordlists combined and alphabetized into freeBrunch_all_gaming_wordlist.txt');