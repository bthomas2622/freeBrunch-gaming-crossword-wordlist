import cors from 'cors';
import express from 'express';
import restless from '@restlessai/sdk';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getCategories, getWordsForCategory } from './wordlists.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultSpecPath = path.join(__dirname, 'openapi.json');

function sendBadRequest(response, message) {
  response.status(400).json({
    error: 'invalid_request',
    message
  });
}

function isSingleLetter(value) {
  return typeof value === 'string' && /^[a-z]$/i.test(value);
}

function isPositiveInteger(value) {
  return typeof value === 'string' && /^[1-9]\d*$/.test(value) && Number.isSafeInteger(Number(value));
}

export function createApp({
  getCategoriesForRequest = getCategories,
  getWordsForCategoryForRequest = getWordsForCategory,
  specPath = defaultSpecPath
} = {}) {
  const app = express();
  const sdk = restless(process.env.RESTLESS_KEY);

  app.use(sdk.setup(() => ({
    apiKey: undefined,
    owner: undefined
  })));
  app.use(cors());

  app.get('/categories', (_request, response) => {
    response.json({ categories: getCategoriesForRequest() });
  });

  app.get('/categories/:category/words', (request, response) => {
    const { startsWith, length } = request.query;

    if (startsWith !== undefined && !isSingleLetter(startsWith)) {
      return sendBadRequest(response, 'startsWith must be a single letter.');
    }

    if (length !== undefined && !isPositiveInteger(length)) {
      return sendBadRequest(response, 'length must be a positive integer.');
    }

    const words = getWordsForCategoryForRequest(request.params.category);

    if (!words) {
      return response.status(404).json({
        error: 'category_not_found',
        message: `Category "${request.params.category}" was not found.`
      });
    }

    const filteredWords = words.filter(word => {
      const matchesStartingLetter = startsWith === undefined
        || word.startsWith(startsWith.toUpperCase());
      const matchesLength = length === undefined || word.length === Number(length);

      return matchesStartingLetter && matchesLength;
    });

    return response.json({
      category: request.params.category.toLowerCase(),
      words: filteredWords
    });
  });

  app.get('/spec', (_request, response) => {
    response.type('application/json').send(readFileSync(specPath, 'utf8'));
  });

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/spec'
    }
  }));

  app.use((_request, response) => {
    response.status(404).json({
      error: 'not_found',
      message: 'Route not found.'
    });
  });

  return app;
}
