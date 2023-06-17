import {
  Group,
  Paper,
  SimpleGrid,
  Text,
  ThemeIcon,
  createStyles,
} from '@mantine/core';
import { UseRankContext } from '../context/rank';

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

function Status() {
  const { classes } = useStyles();
  const { words, answers } = UseRankContext();

  return (
    <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {words.map((word) => {
        const isCorrect = answers[word.id] === word.pos;

        return (
          <Paper withBorder p='md' radius='md' key={word.id}>
            <Group position='apart'>
              <div>
                <Text
                  c='dimmed'
                  tt='uppercase'
                  fw={700}
                  fz='xs'
                  className={classes.label}
                >
                  {word.pos}
                </Text>
                <Text fw={700} fz='xl' tt='capitalize'>
                  {word.word}
                </Text>
              </div>
              <ThemeIcon
                color='gray'
                variant='light'
                sx={(theme) => ({
                  color: isCorrect ? theme.colors.teal[6] : theme.colors.red[6],
                })}
                size={38}
                radius='md'
              >
                {isCorrect ? '✅' : '❌'}
              </ThemeIcon>
            </Group>
            <Text c='dimmed' fz='sm' mt='sm'>
              Your answer{' '}
              <Text component='span' c={isCorrect ? 'teal' : 'red'} fw={700}>
                {answers[word.id]}
              </Text>
            </Text>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
}

export default Status;
