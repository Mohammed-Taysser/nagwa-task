import React, { useContext, useState } from 'react';

const RankContext = React.createContext<RankContextType>({
  words: [],
  answers: [],
  reset: () => console.log('reset'),
  setWords: (word: Word[]) => console.log(word),
  addAnswer: (answer: Answer) => console.log(answer),
});

function RankProvider(props: { children: React.ReactNode }) {
  const [words, setWords] = useState<Word[]>([]);
  const [answers, setAnswers] = useState({});

  const addAnswer = (answer: Answer) => {
    setAnswers((prev) => ({ ...prev, [answer.id]: answer.value }));
  };

  const reset = () => {
    setWords([]);
    setAnswers({});
  };

  return (
    <RankContext.Provider
      value={{ words, setWords, answers, addAnswer, reset }}
    >
      {props.children}
    </RankContext.Provider>
  );
}

const UseRankContext = () => {
  return useContext(RankContext);
};

export { RankContext, RankProvider, UseRankContext };
