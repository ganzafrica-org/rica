import { LinkButton } from "@/components/ui/link-button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="rica-display text-2xl">Page not found</h1>
        <p className="rica-body text-muted">
          The page you are looking for does not exist.
        </p>
        <LinkButton href="/">Back to dashboard</LinkButton>
      </div>
    </div>
  );
}
