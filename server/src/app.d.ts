type WordCategories = 'adverb' | 'verb' | 'noun' | 'adjective';

type Word = {
  id: number;
  word: string;
  pos: WordCategories;
};

interface DB_JSON {
  wordList: Word[];
  scoresList: number[];
}

type ReducedWordCategories = {
  [key in WordCategories]: Word[];
};

export { DB_JSON, WordCategories, ReducedWordCategories };
