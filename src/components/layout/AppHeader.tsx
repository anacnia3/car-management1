import type { ReactNode } from "react";
import { Car as CarIcon } from "lucide-react";

type AppHeaderProps = {
  title?: string;
  actions?: ReactNode;
};

export function AppHeader({ title = "CAR MANAGEMENT", actions }: AppHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-6 sm:flex-row sm:items-center sm:justify-between md:pb-8">
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-[var(--color-sidebar)] p-3 text-[var(--color-accent)]">
          <CarIcon size={28} />
        </div>
        <h1 className="text-xl font-black uppercase tracking-tighter text-[var(--color-text)] md:text-3xl">
          {title}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-3 pr-28 sm:pr-32 md:pr-40">{actions}</div>
    </header>
  );
}
