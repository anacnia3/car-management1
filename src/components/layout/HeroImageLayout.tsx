import { Poppins } from "next/font/google";
import { CarFront } from "lucide-react";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

type HeroVideoSource = {
  src: string;
  type?: "video/mp4" | "video/webm" | "video/ogg";
};

type HeroImageLayoutProps = {
  children: React.ReactNode;
  videoSrc?: string;
  videoSources?: HeroVideoSource[];
  title?: string;
  showTitle?: boolean;
  titleClassName?: string;
  titleWrapperClassName?: string;
  overlayClassName?: string;
  contentClassName?: string;
};

export function HeroImageLayout({
  children,
  videoSrc,
  videoSources,
  title = "CAR MANAGEMENT",
  showTitle = true,
  titleClassName,
  titleWrapperClassName,
  overlayClassName,
  contentClassName,
}: HeroImageLayoutProps) {
  const resolvedVideoSources =
    videoSources && videoSources.length > 0
      ? videoSources
      : videoSrc
        ? [{ src: videoSrc, type: "video/mp4" as const }]
        : [];

  return (
    <main className="fixed inset-0 h-dvh w-screen overflow-hidden bg-black">
      {resolvedVideoSources.length > 0 ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
        >
          {resolvedVideoSources.map((source) => (
            <source key={`${source.src}-${source.type ?? "default"}`} src={source.src} type={source.type} />
          ))}
        </video>
      ) : null}

      <div className={cn("absolute inset-0 z-10 bg-black/50", overlayClassName)} />

      {showTitle && (
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-16 z-20 flex items-center justify-center gap-3 text-center",
            titleWrapperClassName
          )}
        >
          <CarFront className="text-[var(--color-accent)]" size={100} />
          <h1 className={cn(poppins.className, "text-3xl font-black tracking-tight text-white md:text-5xl", titleClassName)}>
            {title}
          </h1>
        </div>
      )}

      <div className={cn("relative z-30 flex min-h-dvh items-center justify-center px-6", contentClassName)}>
        {children}
      </div>
    </main>
  );
}
