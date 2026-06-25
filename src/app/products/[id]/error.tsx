'use client';

import { ErrorView } from '@/components/error-view/ErrorView';

interface ErrorProps {
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <ErrorView
      message="Something went wrong loading this phone."
      reset={reset}
    />
  );
}
