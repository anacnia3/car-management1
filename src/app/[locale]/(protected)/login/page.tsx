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
        <div className="w-full max-w-[340px] rounded-2xl bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:p-6">
          <div className="mb-5 text-center">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Login to Car Management
            </h1>
            <p className="mt-1.5 text-xs text-gray-500">
              Welcome back! Please enter your details.
            </p>
          </div>

          <LoginForm />

          <div className="mt-5 border-t border-gray-100 pt-4 text-center text-xs text-gray-600">
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
