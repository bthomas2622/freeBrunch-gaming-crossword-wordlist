import { readdirSync, readFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wordlistsFilePath = '/category-wordlists'
const wordlists = readdirSync(__dirname + `/..${wordlistsFilePath}`);
const platform = process.argv[2];

for (let wordlist of wordlists) {
  readFile(__dirname + `/..${wordlistsFilePath}/` + wordlist, 'utf8', (err, data) => {
    if (err) throw err;
    const words = platform === 'linux' ? data.split('\n') : data.split('\r\n');
    const wordOccurrences = {};
    let duplicateCount = 0;
    let nonUppercaseCount = 0;
    let nonLetterCount = 0;
    let prevWord = 'A';
    for (let word of words) {   
      if (word.localeCompare(prevWord) < 0) {
        console.log(word.localeCompare(prevWord));
        console.log(`${wordlist} Test FAILED\nWords not alphabetized please run npm run sort\n${word} comes before ${prevWord}`);
        throw new Error(`${wordlist} Test failed.`);
      }
      else {
        prevWord = word;
      }
      if (wordOccurrences[word]) {
        console.log(`Duplicate word found: ${word}`);
        duplicateCount++;
      }
      if (word !== word.toUpperCase()) {
        console.log(`Word not in uppercase: ${word}`);
        nonUppercaseCount++;
      }
      if (word.match(/[^A-Za-z]/g)) {
        const nonLetters = word.match(/[^A-Za-z]/g).join(', ');
        console.log(`Word contains symbols or numbers: ${word}. Non-letter characters found: ${nonLetters}`);
        nonLetterCount++;
      }
      wordOccurrences[word] = true;
    }
    if (duplicateCount > 0 || nonUppercaseCount > 0 || nonLetterCount > 0) {
      console.log(`${wordlist} Test FAILED\n${duplicateCount} duplicate words, ${nonUppercaseCount} non-uppercase words, and ${nonLetterCount} words with numbers/symbols found.`);
      throw new Error(`${wordlist} Test failed.`);
    }
    else {
      console.log(`${wordlist} Test PASSED!\nNo duplicate words, non-uppercase words, or words with numbers/symbols found. Wordlist is alphabetized.`);
    }
  });
}