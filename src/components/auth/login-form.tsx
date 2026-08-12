"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import {
  Alert,
  Button,
  Form,
  InputGroup,
  Label,
  TextField,
} from "@/components/ui";
import { demoPassword, demoUsers } from "@/data/users";
import { getUnit } from "@/data/units";
import { roleHomePath } from "@/lib/auth";
import { appName } from "@/lib/constants";
import type { AuthUser } from "@/types";

/** Short, scannable label for a demo account card. */
function demoAccountLabel(user: AuthUser): string {
  if (user.role === "senior-director") return "Senior Director";
  if (user.role === "director") return `Director · ${getUnit(user.unit).shortLabel}`;
  return getUnit(user.unit).shortLabel;
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function fillDemo(user: AuthUser) {
    setEmail(user.email);
    setPassword(demoPassword);
    setError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as {
        user?: AuthUser;
        error?: string;
      };

      if (!response.ok || !data.user) {
        setError(data.error ?? "Unable to sign in.");
        return;
      }

      router.replace(roleHomePath[data.user.role]);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="login-page relative flex h-dvh max-h-dvh items-center justify-center overflow-hidden px-4 py-4 sm:py-6">
      <div className="login-page__bg absolute inset-0" aria-hidden />

      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 sm:left-7 sm:top-6">
        <div className="flex size-7 items-center justify-center rounded-lg bg-accent text-xs font-bold text-accent-foreground shadow-sm sm:size-8 sm:text-sm">
          R
        </div>
        <span className="text-sm font-semibold tracking-tight text-white drop-shadow-sm sm:text-base">
          {appName}
        </span>
      </div>

      <div className="relative z-10 w-full max-w-[460px]">
        <div className="login-page__card rounded-[24px] border border-white/50 px-6 py-6 sm:rounded-[28px] sm:px-9 sm:py-7">
          <div className="mb-4 flex flex-col items-center text-center sm:mb-5">
            <h1 className="text-[1.4rem] font-semibold tracking-tight text-foreground sm:text-[1.55rem]">
              Sign in with email
            </h1>
            <p className="mt-1.5 max-w-[340px] text-[13px] leading-snug text-muted sm:text-sm sm:leading-relaxed">
              Inspection portals for RICA inspectors, directors and senior
              directors.
            </p>
          </div>

          <Form className="space-y-2.5 sm:space-y-3" onSubmit={handleSubmit}>
            {error ? (
              <Alert status="danger" className="py-2">
                <Alert.Content>
                  <Alert.Description>{error}</Alert.Description>
                </Alert.Content>
              </Alert>
            ) : null}

            <TextField
              isRequired
              name="email"
              type="email"
              value={email}
              onChange={setEmail}
              className="login-page__field w-full"
              aria-label="Email"
            >
              <Label className="sr-only">Email</Label>
              <InputGroup fullWidth className="h-11 px-1">
                <InputGroup.Prefix>
                  <Mail className="size-4 text-muted" strokeWidth={1.75} />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Email"
                  autoComplete="username"
                  className="text-[15px]"
                />
              </InputGroup>
            </TextField>

            <TextField
              isRequired
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={setPassword}
              className="login-page__field w-full"
              aria-label="Password"
            >
              <Label className="sr-only">Password</Label>
              <InputGroup fullWidth className="h-11 px-1">
                <InputGroup.Prefix>
                  <Lock className="size-4 text-muted" strokeWidth={1.75} />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Password"
                  autoComplete="current-password"
                  className="text-[15px]"
                />
                <InputGroup.Suffix>
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="flex size-8 items-center justify-center text-muted transition-colors hover:text-foreground"
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" strokeWidth={1.75} />
                    ) : (
                      <Eye className="size-4" strokeWidth={1.75} />
                    )}
                  </button>
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-[13px] text-muted transition-colors hover:text-foreground sm:text-sm"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="login-page__cta h-11 w-full text-[15px]"
              isDisabled={pending}
            >
              {pending ? "Signing in…" : "Get Started"}
            </Button>
          </Form>

          <div className="my-4 flex items-center gap-3 sm:my-5">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted">Tap a demo account</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {demoUsers.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => fillDemo(user)}
                title={user.email}
                className="group flex w-full items-center gap-2 rounded-xl border border-border/80 bg-white/70 px-3 py-2 text-left transition-colors duration-150 hover:border-accent hover:bg-accent hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span
                  className="size-1.5 shrink-0 rounded-full bg-accent/40 transition-colors group-hover:bg-accent-foreground"
                  aria-hidden
                />
                <span className="truncate text-[13px] font-medium text-foreground transition-colors group-hover:text-accent-foreground">
                  {demoAccountLabel(user)}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-3 text-center text-[11px] text-muted">
            Any account · password <span className="font-medium">password</span>
          </p>
        </div>
      </div>
    </div>
  );
}
