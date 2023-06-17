import {
  Alert,
  Container,
  Flex,
  Loader,
  Title,
  createStyles,
  rem,
} from '@mantine/core';

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
}));

function Wrapper(props: WrapperProps) {
  const { classes } = useStyles();

  const Content = () => {
    if (props.isLoading) {
      return (
        <Flex justify='center' w='100vw' h='100vh'>
          <Loader color='' size='xl' variant='dots' />
        </Flex>
      );
    }

    if (props.error) {
      return (
        <Alert title='Error!' color='red'>
          {JSON.stringify(props.error)}
        </Alert>
      );
    }

    return (
      <>
        {props.title && (
          <Title align='center' className={classes.title}>
            {props.title}
          </Title>
        )}

        {props.children}
      </>
    );
  };

  return (
    <div className={classes.wrapper}>
      <Container size='sm'>
        <Content />
      </Container>
    </div>
  );
}

export default Wrapper;
