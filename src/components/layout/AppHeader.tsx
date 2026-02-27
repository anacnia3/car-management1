import type { ReactNode } from "react";
import { Car as CarIcon } from "lucide-react";

type AppHeaderProps = {
  title?: string;
  actions?: ReactNode;
};

export function AppHeader({ title = "CAR MANAGEMENT", actions }: AppHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-4 sm:flex-row sm:items-center sm:justify-between md:pb-6">
      <div className="flex items-center gap-4">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 text-[var(--color-muted)]">
          <CarIcon size={22} />
        </div>
        <h1 className="text-lg font-semibold tracking-tight text-[var(--color-text)] md:text-2xl">
          {title}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-3">{actions}</div>
    </header>
  );
}
