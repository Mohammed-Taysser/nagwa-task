import { SimpleGrid } from '@mantine/core';
import SingleAnswer from './SingleAnswer';
import { WORD_SPEECH } from '../constants/word';

function Answers(props: AnswersProps) {
  return (
    <SimpleGrid cols={2} mt={30}>
      {WORD_SPEECH.map((title) => (
        <SingleAnswer
          answer={props.answer}
          title={title}
          onChange={props.setAnswer}
          key={title}
        />
      ))}
    </SimpleGrid>
  );
}

export default Answers;
