import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createApp } from '../backend/app.js';

let server;
let baseUrl;

before(() => {
  server = createApp().listen(0);
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

after(() => new Promise(resolve => server.close(resolve)));

async function get(path) {
  const response = await fetch(`${baseUrl}${path}`);
  return {
    status: response.status,
    body: await response.json()
  };
}

test('lists all wordlist categories', async () => {
  const { status, body } = await get('/categories');

  assert.equal(status, 200);
  assert.deepEqual(body.categories.map(category => category.name), [
    'characters',
    'consoles',
    'developers',
    'games',
    'genres',
    'influencers',
    'terms'
  ]);
  assert.equal(body.categories.find(category => category.name === 'characters').wordCount, 121);
});

test('returns all words for a category regardless of category case', async () => {
  const { status, body } = await get('/categories/CHARACTERS/words');

  assert.equal(status, 200);
  assert.equal(body.category, 'characters');
  assert.equal(body.words.length, 121);
  assert.ok(body.words.includes('BOWSER'));
});

test('filters category words by first letter', async () => {
  const { status, body } = await get('/categories/characters/words?startsWith=b');

  assert.equal(status, 200);
  assert.deepEqual(body.words, [
    'BASTION',
    'BELLAGOTH',
    'BIGDADDY',
    'BIRDO',
    'BLOOPER',
    'BOBOMB',
    'BOWSER',
    'BOWSERJR',
    'BRIGITTE',
    'BULLETBILL'
  ]);
});

test('filters category words by length and combines filters', async () => {
  const lengthResponse = await get('/categories/characters/words?length=3');
  const combinedResponse = await get('/categories/characters/words?startsWith=B&length=5');

  assert.equal(lengthResponse.status, 200);
  assert.deepEqual(lengthResponse.body.words, ['ANA', 'DVA', 'FOX', 'IKE', 'KEN', 'MEI', 'ROB', 'ROY', 'RYU']);
  assert.equal(combinedResponse.status, 200);
  assert.deepEqual(combinedResponse.body.words, ['BIRDO']);
});

test('returns documented errors for invalid filters and missing categories', async () => {
  const invalidLetter = await get('/categories/characters/words?startsWith=AB');
  const invalidLength = await get('/categories/characters/words?length=0');
  const missingCategory = await get('/categories/missing/words');

  assert.deepEqual(invalidLetter, {
    status: 400,
    body: {
      error: 'invalid_request',
      message: 'startsWith must be a single letter.'
    }
  });
  assert.deepEqual(invalidLength, {
    status: 400,
    body: {
      error: 'invalid_request',
      message: 'length must be a positive integer.'
    }
  });
  assert.deepEqual(missingCategory, {
    status: 404,
    body: {
      error: 'category_not_found',
      message: 'Category "missing" was not found.'
    }
  });
});

test('serves the OpenAPI specification', async () => {
  const { status, body } = await get('/spec');

  assert.equal(status, 200);
  assert.equal(body.openapi, '3.0.3');
  assert.ok(body.paths['/categories/{category}/words']);
});

test('serves interactive Swagger documentation', async () => {
  const response = await fetch(`${baseUrl}/docs/`);
  const body = await response.text();
  const initializationResponse = await fetch(`${baseUrl}/docs/swagger-ui-init.js`);
  const initialization = await initializationResponse.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /^text\/html/);
  assert.match(body, /swagger-ui-init\.js/);
  assert.equal(initializationResponse.status, 200);
  assert.match(initialization, /SwaggerUIBundle/);
  assert.match(initialization, /"url": "\/spec"/);
});
