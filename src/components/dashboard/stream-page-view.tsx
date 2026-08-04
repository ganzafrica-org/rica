"use client";

import {
  Beaker,
  Building2,
  ClipboardCheck,
  Droplets,
} from "lucide-react";
import { PageTransition } from "@/components/motion/page-transition";
import { PageTitle } from "@/components/layout/page-title";
import { Button, Card } from "@/components/ui";
import { LinkButton } from "@/components/ui/link-button";
import { streams } from "@/data/navigation";
import type { StreamKey } from "@/types";
import { cn } from "@/lib/utils";

const icons = {
  seed: Droplets,
  slaughterhouse: Building2,
  agrochemical: Beaker,
  "seed-producer": ClipboardCheck,
} as const;

const tones = {
  seed: {
    accent: "border-l-stream-seed",
    icon: "bg-stream-seed-soft text-stream-seed",
  },
  slaughterhouse: {
    accent: "border-l-stream-slaughterhouse",
    icon: "bg-stream-slaughterhouse-soft text-stream-slaughterhouse",
  },
  agrochemical: {
    accent: "border-l-stream-agrochemical",
    icon: "bg-stream-agrochemical-soft text-stream-agrochemical",
  },
  "seed-producer": {
    accent: "border-l-stream-seed-producer",
    icon: "bg-stream-seed-producer-soft text-stream-seed-producer",
  },
} as const;

type StreamPageViewProps = {
  streamId: StreamKey;
};

export function StreamPageView({ streamId }: StreamPageViewProps) {
  const stream = streams.find((item) => item.id === streamId)!;
  const Icon = icons[streamId];
  const tone = tones[streamId];

  return (
    <PageTransition className="space-y-6">
      <PageTitle
        title={stream.label}
        description={`${stream.formCode} · ${stream.description}`}
        actions={
          <>
            <Button>Start inspection</Button>
            <Button variant="secondary">View assigned</Button>
            <LinkButton href="/inspector" variant="ghost">
              Back to dashboard
            </LinkButton>
          </>
        }
      />

      <Card
        className={cn(
          "border-border/70 border-l-4 bg-surface shadow-sm",
          tone.accent,
        )}
      >
        <Card.Header className="flex flex-row items-start gap-4">
          <div
            className={cn(
              "flex size-12 items-center justify-center",
              tone.icon,
            )}
          >
            <Icon className="size-6" />
          </div>
          <div className="space-y-1">
            <Card.Title className="rica-title">Stream workspace</Card.Title>
            <Card.Description className="rica-body text-muted">
              Forms, pending items, and history for this regulatory stream will
              live here.
            </Card.Description>
          </div>
        </Card.Header>
        <Card.Content>
          <p className="rica-body text-muted">
            Use the sidebar to switch streams. Dashboard charts and pending
            activity already reflect this stream&apos;s color and data.
          </p>
        </Card.Content>
      </Card>
    </PageTransition>
  );
}
