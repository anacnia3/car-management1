"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { LoginForm } from "@/features/auth/components/login-form";
import { VideoHeroLayout } from "@/components/layout/VideoHeroLayout";

export default function LoginPage() {
  const { locale } = useParams();
  const localeValue = Array.isArray(locale) ? locale[0] : locale;

  return (
    <VideoHeroLayout>
        <div className="w-full max-w-[450px] rounded-2xl bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Login to Car Management
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Welcome back! Please enter your details.
            </p>
          </div>

          <LoginForm />

          <div className="mt-8 border-t border-gray-100 pt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href={`/${localeValue}/register`}
              className="font-bold text-blue-600 transition-all hover:underline"
            >
              Register Now
            </Link>
          </div>
        </div>
    </VideoHeroLayout>
  );
}
