import {
  Button,
  Flex,
  RingProgress,
  Text,
  Title,
  createStyles,
  rem,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Answers from '../components/Answers';
import Wrapper from '../components/Wrapper';
import { UseRankContext } from '../context/rank';
import { getWords as getWordsApi } from '../core/api';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    minHeight: rem(820),
    backgroundImage: `radial-gradient(${
      theme.colors[theme.primaryColor][6]
    } 0%, ${theme.colors[theme.primaryColor][4]} 100%)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top left',
    position: 'relative',
    color: theme.black,
    height: '100vh',
    width: '100vw',
  },

  title: {
    color: theme.white,
    fontSize: 52,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },

  word: {
    backgroundColor: theme.white,
    padding: '12px',
    fontSize: '17px',
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
    textAlign: 'center',
  },
}));

function Practice() {
  const navigateTo = useNavigate();
  const { classes } = useStyles();
  const { words, setWords, addAnswer, reset } = UseRankContext();
  const [isLoading, setIsLoading] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // reset words and answers
    reset();
    // get words by api
    getWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLastQuestion = useMemo(
    () => wordIndex + 1 === words.length,
    [wordIndex, words]
  );

  const progressPercent = useMemo(
    () => (wordIndex / words.length) * 100,
    [wordIndex, words]
  );

  const onAnswerQuestion = () => {
    if (answer) {
      // show notification on success answer
      if (words[wordIndex].pos === answer) {
        notifications.show({
          title: 'Success answer ✅',
          message: 'Hey there, your answer is awesome! ',
        });
      }

      addAnswer({
        value: answer,
        id: words[wordIndex].id,
      });

      if (!isLastQuestion) {
        setWordIndex((prev) => prev + 1);
        setAnswer('');
      } else {
        navigateTo('/rank');
      }
    }
  };

  const getWords = async () => {
    await getWordsApi()
      .then((response) => {
        setWords(response.data);
      })
      .catch((error) => {
        if (error.message === 'Network Error') {
          setError(
            'Please check internet connection, or the server maybe down'
          );
        } else {
          setError(error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Wrapper title='FAQ' {...{ isLoading, error }}>
      {words.length && (
        <>
          <Flex justify='space-between' align='center' mb={30}>
            <Title align='center' size={'h3'} color='white'>
              Choose the correct part of speech
            </Title>

            <RingProgress
              size={80}
              thickness={8}
              sections={[{ value: progressPercent, color: 'teal' }]}
              label={
                <Text color='white' weight={700} align='center' size='sm'>
                  {progressPercent}%
                </Text>
              }
            />
          </Flex>

          <div className={classes.word}>{words[wordIndex].word}</div>

          <Answers answer={answer} setAnswer={setAnswer} />

          <Flex justify='center' mt={40}>
            <Button
              variant='default'
              radius='xl'
              onClick={onAnswerQuestion}
              disabled={!answer}
            >
              {isLastQuestion ? 'See results' : 'Next Question'}
            </Button>
          </Flex>
        </>
      )}
    </Wrapper>
  );
}

export default Practice;
