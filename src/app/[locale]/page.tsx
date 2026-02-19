import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">

      
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/login.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50" />
 
      <div className="relative flex items-center justify-center h-full">
        <div className="w-[400px] rounded-2xl bg-background/80 backdrop-blur p-6">
          <LoginForm />
        </div>
      </div>

    </div>
  );
}
