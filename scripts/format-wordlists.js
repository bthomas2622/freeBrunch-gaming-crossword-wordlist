import { readdirSync, readFile, writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wordlistsFilePath = '/category-wordlists'
const wordlists = readdirSync(__dirname + `/..${wordlistsFilePath}`);

for (let wordlist of wordlists) {
  readFile(__dirname + `/..${wordlistsFilePath}/` + wordlist, 'utf8', (err, data) => {
    if (err) throw err;

    const rows = data.split('\n');
    const sortedRows = rows.sort();
    for (let i = 0; i < sortedRows.length; i++) {
      sortedRows[i] = sortedRows[i].toUpperCase();
    }
    const sortedData = sortedRows.join('\n');

    writeFile(__dirname + `/..${wordlistsFilePath}/${wordlist}`, sortedData, 'utf8', (err) => {
      if (err) throw err;
      console.log(`Alphabetized/uppercased ${wordlist}`);
    });
  });
}