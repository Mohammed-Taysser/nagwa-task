import { Alert, Anchor, Button, Card, Flex, Text, Title } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Status from '../components/Status';
import Wrapper from '../components/Wrapper';
import { UseRankContext } from '../context/rank';
import { getRank as getRankApi } from '../core/api';

function Rank() {
  const { words, answers } = UseRankContext();
  const [rank, setRank] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isFinishAnswer = useMemo(
    () => words.length && Object.keys(answers).length,
    [words, answers]
  );

  const answeredQuestion = useMemo(
    () =>
      words.reduce((prev, current) => {
        if (answers[current.id] === current.pos) {
          return prev + 1;
        }
        return prev;
      }, 0),
    [answers, words]
  );

  const getScore = () => {
    return (answeredQuestion / words.length) * 100;
  };

  useEffect(() => {
    if (isFinishAnswer) {
      setIsLoading(true);
      getRank();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRank = async () => {
    const score = getScore();
    await getRankApi(score)
      .then((response) => {
        setRank(response.data.rank);
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

  const UnCompleteAnswersAlert = () => {
    return (
      <Alert title='Error!' color='red'>
        <Title size='h5'>
          Your need to answer the{' '}
          <Anchor component={Link} to='/'>
            Question
          </Anchor>{' '}
          first to see your rank !!
        </Title>
      </Alert>
    );
  };

  return (
    <Wrapper title='Your Rank' {...{ isLoading, error }}>
      {isFinishAnswer ? (
        <>
          <Card shadow='sm' px='lg' py={50} radius='md' withBorder mb={30}>
            <Flex justify='space-between'>
              <div>
                <Title weight={500} color='blue' size='3rem'>
                  {rank}
                </Title>

                <Text color='dimmed'>Rank</Text>
              </div>
              <div>
                <Flex justify='space-between'>
                  <Text c='dimmed' fz='md'>
                    Correct answer:
                  </Text>
                  <Text component='span' c='teal' fw={700}>
                    {answeredQuestion}
                  </Text>
                </Flex>
                <Flex justify='space-between'>
                  <Text c='dimmed' fz='md'>
                    Wrong answer:
                  </Text>
                  <Text component='span' c='red' fw={700}>
                    {words.length - answeredQuestion}
                  </Text>
                </Flex>
                <Flex justify='space-between'>
                  <Text c='dimmed' fz='md'>
                    Total questions:
                  </Text>
                  <Text component='span' fw={700} ml={10}>
                    {words.length}
                  </Text>
                </Flex>
              </div>
            </Flex>
          </Card>

          <Status />
          <Button
            variant='light'
            color='blue'
            fullWidth
            mt='xl'
            radius='md'
            component={Link}
            to='/'
          >
            Ty again
          </Button>
        </>
      ) : (
        <UnCompleteAnswersAlert />
      )}
    </Wrapper>
  );
}

export default Rank;
