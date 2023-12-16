export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <b>1. Please try to reload the page firstly</b>
      <b>2.If that does not work, click the button bellow</b>
      <button onClick={resetErrorBoundary}>
        Try again (refresh the page first!)
      </button>
    </div>
  );
};
