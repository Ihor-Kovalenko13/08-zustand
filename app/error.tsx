'use client';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <h2>There was an error: {error.message}, please try again...</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}