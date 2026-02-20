import { LoginForm } from "@/features/auth/components/login-form";
import { VideoHeroLayout } from "@/components/layout/VideoHeroLayout";

export default function LoginPage() {
  return (
    <VideoHeroLayout overlayClassName="bg-black/55" contentClassName="px-4">
        <div className="w-[400px] rounded-2xl bg-background/80 backdrop-blur p-6">
          <LoginForm />
        </div>
    </VideoHeroLayout>
  );
}
