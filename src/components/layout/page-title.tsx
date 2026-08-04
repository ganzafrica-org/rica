import { cn } from "@/lib/utils";
import { unitName } from "@/lib/constants";

type PageTitleProps = {
  title?: string;
  description?: string;
  className?: string;
  actions?: React.ReactNode;
};

/** Reusable white title bar for page/section headings. */
export function PageTitle({
  title = unitName,
  description,
  className,
  actions,
}: PageTitleProps) {
  return (
    <div
      className={cn(
        "page-title flex flex-col gap-2 border border-border bg-surface px-5 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        <h2 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
          {title}
        </h2>
        {description ? (
          <p className="rica-body mt-1 text-muted">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>
      ) : null}
    </div>
  );
}
