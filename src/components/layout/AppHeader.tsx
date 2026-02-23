import type { ReactNode } from "react";
import { Car as CarIcon } from "lucide-react";

type AppHeaderProps = {
  title?: string;
  actions?: ReactNode;
};

export function AppHeader({ title = "CAR MANAGEMENT", actions }: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-[var(--color-border)] pb-8">
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-[var(--color-sidebar)] p-3 text-[var(--color-accent)]">
          <CarIcon size={28} />
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tighter text-[var(--color-text)] md:text-3xl">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4 md:gap-8">{actions}</div>
    </header>
  );
}
