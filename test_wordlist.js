const fs = require('fs');

fs.readFile('freeBrunch_gaming_wordlist.txt', 'utf8', (err, data) => {
  if (err) throw err;
  const words = data.split('\n');
  const wordOccurrences = {};
  let duplicateCount = 0;
  for (let word of words) {
    if (wordOccurrences[word]) {
      console.log(`Duplicate word found: ${word}`);
      duplicateCount++;
    }
    wordOccurrences[word] = true;
  }
  if (duplicateCount > 0) {
    console.log(`Test failed. ${duplicateCount} duplicate words found.`);
    throw new Error('Duplicate words found.');
  } else {
    console.log('Test passed. No duplicate words found.');
  }
});