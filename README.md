# freeBrunch Gaming Crossword Wordlist

This repository contains a [crossword wordlist](https://github.com/bthomas2622/freeBrunch-gaming-crossword-wordlist/blob/main/freeBrunch_all_gaming_wordlist.txt) with video game related words. You are free to use this list in any way you'd like. Credit is appreciated but not required!

The [category-wordlists](https://github.com/bthomas2622/freeBrunch-gaming-crossword-wordlist/blob/main/category-wordlists) contains all the words from `freeBrunch_all_gaming_wordlist` broken down into categorical wordlists.

Contributions welcome! Please submit a pull request with your additions to the [category-wordlists](https://github.com/bthomas2622/freeBrunch-gaming-crossword-wordlist/blob/main/category-wordlists).

- `npm run test` ensures there are no duplicates, lowercase words, or words with special characters found in the lists.
- `npm run test-windows` will run the above test on Windows machines.
- `npm run format` will sort the category wordlists alphabetically and ensure all the words are uppercase.
- `npm run compile` will compile the category wordlists into the `freeBrunch_all_gaming_wordlist.txt` file.

## Local API

Run `npm install` followed by `npm start` to serve the read-only API at `http://localhost:3000`.

- `GET /categories` lists available wordlist categories.
- `GET /categories/{category}/words` returns a category's words.
- `GET /categories/{category}/words?startsWith=A` filters by first letter.
- `GET /categories/{category}/words?length=5` filters by word length.
- `GET /spec` returns the OpenAPI specification.
- `GET /docs` opens interactive Swagger UI documentation for testing the API.
