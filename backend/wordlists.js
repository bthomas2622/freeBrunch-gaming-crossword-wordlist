import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultWordlistDirectory = path.resolve(__dirname, '../category-wordlists');
const filenamePattern = /^freeBrunch_(.+)_gaming_wordlist\.txt$/;

function getCategoryFromFilename(filename) {
  const match = filenamePattern.exec(filename);
  return match?.[1];
}

function getWordlistFiles(wordlistDirectory) {
  return readdirSync(wordlistDirectory)
    .map(filename => ({ filename, category: getCategoryFromFilename(filename) }))
    .filter(wordlist => wordlist.category)
    .sort((first, second) => first.category.localeCompare(second.category));
}

function getWordsFromFile(filepath) {
  return readFileSync(filepath, 'utf8')
    .split(/\r?\n/)
    .filter(Boolean);
}

export function getCategories(wordlistDirectory = defaultWordlistDirectory) {
  return getWordlistFiles(wordlistDirectory).map(({ filename, category }) => ({
    name: category,
    wordCount: getWordsFromFile(path.join(wordlistDirectory, filename)).length
  }));
}

export function getWordsForCategory(category, wordlistDirectory = defaultWordlistDirectory) {
  const wordlist = getWordlistFiles(wordlistDirectory)
    .find(({ category: name }) => name.toLowerCase() === category.toLowerCase());

  if (!wordlist) {
    return null;
  }

  return getWordsFromFile(path.join(wordlistDirectory, wordlist.filename));
}
