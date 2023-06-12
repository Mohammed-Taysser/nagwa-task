import { Request, Response } from 'express';
import { DB_JSON, WordCategories, ReducedWordCategories } from './app.d';
const { statusCode, Random } = require('./utils');
const DB: DB_JSON = require('../TestData.json');
require('dotenv').config();

const RANDOM_WORDS_NUMBER = parseInt(
  process.env.RANDOM_WORDS_NUMBER ?? '10',
  10
);

// see REFACTORED_WORD_DB on README
const REFACTORED_WORD_DB = DB.wordList.reduce((prev, current) => {
  if (prev.hasOwnProperty(current.pos)) {
    return { ...prev, [current.pos]: [...prev[current.pos], current] };
  } else {
    return { ...prev, [current.pos]: [current] };
  }
}, {} as ReducedWordCategories);

/**
 * @route /
 * @description use to check server status
 */
const heathCheck = async (_request: Request, response: Response) => {
  response.status(statusCode.success.ok).json({ status: true });
};

/**
 * @route /word
 * @description returns a list of 10 objects selected randomly from the "wordsList"
 */
const word = async (_request: Request, response: Response) => {
  // to make sure at least one of each word type is exist
  const results = Object.keys(REFACTORED_WORD_DB).map((key) =>
    Random.arrayItem(REFACTORED_WORD_DB[key as WordCategories])
  );

  while (results.length < RANDOM_WORDS_NUMBER) {
    const randomItem = Random.arrayItem(DB.wordList);
    const isRepeated = results.find((item) => item.id === randomItem.id);

    // to make sure the random word is not repeated
    if (!isRepeated) {
      results.push(randomItem);
    }
  }

  response.status(statusCode.success.ok).json(results);
};

/**
 * @route /rank
 * @description takes the final score in the request body, and responds back with the rank% rounded to the nearest hundredth.
 */
const rank = async (request: Request, response: Response) => {
  // get score
  // GET:  /rank?score=90   => 90
  // GET:  /rank/90         => 90
  // POST: /rank            => 90
  const score = parseFloat(
    request.body?.score || request.params?.score || request.query?.score
  );

  if (!score) {
    return response
      .status(statusCode.error.badRequest)
      .json({ error: 'No score provide' });
  }

  // get scores in the scoresList which are below score
  const scores = DB.scoresList.filter((item) => item < score);

  // calculate percentage
  const rank = parseFloat(
    ((scores.length / DB.scoresList.length) * 100).toFixed(2)
  );

  response.status(statusCode.success.ok).json({ rank });
};

module.exports = { heathCheck, word, rank };
