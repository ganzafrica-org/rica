"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
import {
  Alert,
  Button,
  Form,
  InputGroup,
  Label,
  ListBox,
  Select,
  TextField,
} from "@/components/ui";
import { businessUnits } from "@/data/units";
import { demoPassword, demoUsers } from "@/data/users";
import { authenticate, roleHomePath } from "@/lib/auth";
import { setSessionCookie } from "@/lib/client-session";
import { appName } from "@/lib/constants";
import type { AuthUser } from "@/types";

function demoLabel(user: AuthUser) {
  const unit = user.unit ? businessUnits[user.unit].shortName : "";
  return unit ? `Director · ${unit}` : "Director";
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.8-5.5 3.8-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.3 14.6 2.4 12 2.4 6.9 2.4 2.8 6.5 2.8 11.6S6.9 20.8 12 20.8c5.5 0 9.1-3.9 9.1-9.3 0-.6-.1-1.1-.2-1.6H12z"
      />
      <path
        fill="#34A853"
        d="M3.9 7.5 7.1 9.9C8 7.8 9.9 6.3 12 6.3c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.3 14.6 2.4 12 2.4 8.4 2.4 5.3 4.5 3.9 7.5z"
      />
      <path
        fill="#FBBC05"
        d="M12 20.8c2.5 0 4.7-.8 6.3-2.3l-3-2.5c-.8.6-1.9 1-3.3 1-2.5 0-4.6-1.7-5.4-4l-3.2 2.5c1.5 3 4.5 5.3 8.6 5.3z"
      />
      <path
        fill="#4285F4"
        d="M21.1 11.5c0-.6-.1-1.1-.2-1.6H12v3.9h5.5c-.3 1.3-1.1 2.3-2.2 3l3 2.5c1.8-1.6 3-4.1 3-7.8z"
      />
    </svg>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [demoIndex, setDemoIndex] = useState(0);

  function fillDemo() {
    const user = demoUsers[demoIndex % demoUsers.length]!;
    setEmail(user.email);
    setPassword(demoPassword);
    setError(null);
    setDemoIndex((value) => value + 1);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      // Frontend-only demo auth — no API round-trip.
      const user = authenticate(email, password);
      if (!user) {
        setError("Invalid email or password.");
        return;
      }

      setSessionCookie(user.id);
      router.replace(roleHomePath[user.role]);
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
              Sign in to your assigned RICA unit portal. Directors only see their
              own unit dashboard.
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

            <Select
              className="login-page__field w-full"
              aria-label="Demo account"
              placeholder="Pick a demo account"
              onSelectionChange={(key) => {
                if (key == null) return;
                const user = demoUsers.find((item) => item.id === String(key));
                if (!user) return;
                setEmail(user.email);
                setPassword(demoPassword);
                setError(null);
              }}
            >
              <Label className="sr-only">Demo account</Label>
              <Select.Trigger className="h-11">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {demoUsers.map((user) => (
                    <ListBox.Item
                      key={user.id}
                      id={user.id}
                      textValue={demoLabel(user)}
                    >
                      {demoLabel(user)}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

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
            <span className="text-xs text-muted">Or sign in with</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              aria-label="Continue with Google"
              className="flex h-11 w-full max-w-[280px] items-center justify-center gap-2.5 rounded-2xl border border-border/80 bg-white text-[14px] font-medium text-foreground shadow-sm transition hover:bg-default/60"
              onClick={fillDemo}
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Fill next demo account"
        title="Fill demo credentials"
        onClick={fillDemo}
        className="absolute bottom-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/90 text-accent shadow-lg ring-1 ring-black/5 backdrop-blur transition hover:scale-105 hover:bg-white sm:bottom-5 sm:right-5 sm:size-11"
      >
        <Sparkles className="size-4 sm:size-5" strokeWidth={1.75} />
      </button>
    </div>
  );
}
