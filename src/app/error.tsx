"use client";

import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="rica-display text-2xl">Something went wrong</h1>
        <p className="rica-body text-muted">
          {error.message || "An unexpected error occurred."}
        </p>
        <Button onPress={reset}>Try again</Button>
      </div>
    </div>
  );
}
