import { Center, Loader, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { RouterProvider } from 'react-router-dom';
import { RankProvider } from '../context/rank';
import ErrorBoundary from './ErrorBoundary';
import routes from './Routes';

function App() {
  return (
    <ErrorBoundary>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <RankProvider>
          <Notifications position='top-right' zIndex={2077} />
          <RouterProvider
            router={routes}
            fallbackElement={
              <Center h={200}>
                <Loader color='' size='xl' variant='dots' />
              </Center>
            }
          />
        </RankProvider>
      </MantineProvider>
    </ErrorBoundary>
  );
}

export default App;
