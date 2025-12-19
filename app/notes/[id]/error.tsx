'use client';

type idErrorProps = {
  error: Error;
};

export default function IdError({ error }: idErrorProps) {
  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
    </div>
  );
}