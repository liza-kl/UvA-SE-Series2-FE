export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <p>
        <b>1. Please try to reload the page firstly</b>
      </p>
      <p>
        <b>2.If that does not work, click the button bellow</b>
      </p>
      <button onClick={resetErrorBoundary}>
        Try again (refresh the page first!)
      </button>
    </div>
  );
};
