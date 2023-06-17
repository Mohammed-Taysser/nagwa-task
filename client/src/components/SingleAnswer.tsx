import {
  Checkbox,
  Text,
  UnstyledButton,
  createStyles,
  rem,
} from '@mantine/core';

const useStyles = createStyles((theme, { checked }: { checked: boolean }) => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    transition: 'background-color 150ms ease, border-color 150ms ease',
    border: `${rem(1)} solid ${
      checked
        ? theme.fn.variant({ variant: 'outline', color: theme.primaryColor })
            .border
        : theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[3]
    }`,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
    backgroundColor: checked
      ? theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .background
      : theme.colorScheme === 'dark'
      ? theme.colors.dark[8]
      : theme.white,
  },

  body: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
}));

function SingleAnswer(props: SingleAnswerProps) {
  const isChecked = props.answer === props.title;

  const { classes } = useStyles({ checked: isChecked });

  return (
    <UnstyledButton
      onClick={() => props.onChange(props.title)}
      className={classes.button}
    >
      <div className={classes.body}>
        <Text weight={500} size='sm' sx={{ lineHeight: 1 }}>
          {props.title}
        </Text>
      </div>

      <Checkbox
        defaultChecked={isChecked}
        value={props.title}
        tabIndex={-1}
        name='single-answer'
      />
    </UnstyledButton>
  );
}
export default SingleAnswer;
