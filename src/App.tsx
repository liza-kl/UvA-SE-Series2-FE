import { CssBaseline, GeistProvider } from '@geist-ui/core';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/ErrorFallback';
import { Home } from './pages/Home';

function App() {
  return (
    <GeistProvider>
      <CssBaseline />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          {
            localStorage.removeItem('currentFile');
            window.location.reload();
          }
        }} // increment the retry count on reset
      >
        <Home></Home>
      </ErrorBoundary>
    </GeistProvider>
  );
}

export default App;
