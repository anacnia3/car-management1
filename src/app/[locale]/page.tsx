import { LoginForm } from "@/features/auth/components/login-form";
import { HeroImageLayout } from "@/components/layout/HeroImageLayout";

export default function LoginPage() {
  return (
    <HeroImageLayout
      videoSrc="/videos/login.mp4"
      overlayClassName="bg-black/30"
      contentClassName="px-4"
    >
        <div className="w-full max-w-[380px] rounded-2xl bg-white px-5 py-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <LoginForm />
        </div>
    </HeroImageLayout>
  );
}
