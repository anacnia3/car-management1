import Image from "next/image";
import { Poppins } from "next/font/google";
import { CarFront } from "lucide-react";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

type HeroImageLayoutProps = {
  children: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  showTitle?: boolean;
  titleClassName?: string;
  titleWrapperClassName?: string;
  overlayClassName?: string;
  contentClassName?: string;
};

export function HeroImageLayout({
  children,
  imageSrc = "/images/auth-hero-v2.png",
  imageAlt = "Background",
  title = "CAR MANAGEMENT",
  showTitle = true,
  titleClassName,
  titleWrapperClassName,
  overlayClassName,
  contentClassName,
}: HeroImageLayoutProps) {
  return (
    <main className="fixed inset-0 h-dvh w-screen overflow-hidden bg-black">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div className={cn("absolute inset-0 z-10 bg-black/50 backdrop-blur-[2px]", overlayClassName)} />

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
