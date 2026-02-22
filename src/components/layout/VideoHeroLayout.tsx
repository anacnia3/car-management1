import { cn } from "@/lib/utils";
import { CarFront } from "lucide-react";

type VideoHeroLayoutProps = {
  children: React.ReactNode;
  title?: string;
  overlayClassName?: string;
  contentClassName?: string;
};

export function VideoHeroLayout({
  children,
  title = "CAR MANAGEMENT",
  overlayClassName,
  contentClassName,
}: VideoHeroLayoutProps) {
  return (
    <main className="fixed inset-0 h-dvh w-screen overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full scale-125 object-cover md:scale-110"
      >
        <source src="/videos/login.mp4" type="video/mp4" />
      </video>

      <div className={cn("absolute inset-0 z-10 bg-black/60", overlayClassName)} />

      <div className="pointer-events-none absolute inset-x-0 top-10 z-20 flex items-center justify-center gap-3 text-center">
        <CarFront className="text-[var(--color-accent)]" size={110} />
        <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h1>
      </div>

      <div className={cn("relative z-30 flex min-h-dvh items-center justify-center px-6", contentClassName)}>
        {children}
      </div>
    </main>
  );
}
