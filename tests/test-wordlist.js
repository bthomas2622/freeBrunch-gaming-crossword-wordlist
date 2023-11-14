import { readdirSync, readFile } from 'fs';

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
    for (let word of words) {
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
    } else {
      console.log(`${wordlist} Test PASSED!\nNo duplicate words, non-uppercase words, or words with numbers/symbols found.`);
    }
  });
}