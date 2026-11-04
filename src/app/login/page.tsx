
"use client";

import { useState } from "react";
import Link from "next/link";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignInForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleEmailSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      toast.success("You have successfully signed in!");
      router.push("/");
    }

    if (error) {
      toast.error("Sign in failed!");
    }
  };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });

    if (data) {
      toast.success("You have successfully signed in with Google!");
      router.push("/");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center bg-[#f1faf1] px-4 py-20">

      <div className="w-full max-w-md">

        <Card className="overflow-hidden rounded-md border border-[#e5eee5] bg-white pt-0 shadow-none">

          <CardContent className="px-6 pt-8 sm:px-9 sm:pt-9">

            {/* Header */}
            <div className="mb-6 space-y-2 text-center">
              <h1 className="font-heading text-2xl font-semibold tracking-tight text-[#163a2b] sm:text-3xl">
                Welcome Back
              </h1>

              <p className="mx-auto max-w-[280px] text-xs leading-5 text-[#5c665e]">
                Sign in to continue making a difference in your
                community.
              </p>
            </div>

            <form onSubmit={handleEmailSignin}>
              <FieldGroup className="gap-4">

                {/* Email */}
                <Field className="gap-2">
                  <FieldLabel
                    htmlFor="email"
                    className="text-[11px] font-semibold text-[#1c2b23]"
                  >
                    Email Address
                  </FieldLabel>

                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#46564b]" />

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                      className="h-10 rounded-sm border-[#edf0ed] bg-white pl-9 text-xs shadow-none placeholder:text-[#9ba59e] focus-visible:ring-1 focus-visible:ring-[#8fa995]"
                    />
                  </div>
                </Field>

                {/* Password */}
                <Field className="gap-2">
                  <FieldLabel
                    htmlFor="password"
                    className="text-[11px] font-semibold text-[#1c2b23]"
                  >
                    Password
                  </FieldLabel>

                  <div className="relative">
                    <LockKeyhole className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#46564b]" />

                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      className="h-10 rounded-sm border-[#edf0ed] bg-white px-9 pr-10 text-xs shadow-none placeholder:text-[#9ba59e] focus-visible:ring-1 focus-visible:ring-[#8fa995]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-[#46564b] hover:text-[#1a4332]"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </Field>


                {/* Sign In Button */}
                <Button
                  type="submit"
                  className="h-10 w-full rounded-sm bg-[#163f32] text-sm font-semibold text-white shadow-sm hover:bg-[#24513c]"
                >
                  Sign In
                  <ArrowRight className="ml-1 size-4" />
                </Button>

                {/* Separator */}
                <FieldSeparator className="text-[9px] tracking-widest text-[#5c665e] [&_[data-slot=field-separator-content]]:bg-white">
                  OR
                </FieldSeparator>

                {/* Google Sign In */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleLogin}
                  className="h-10 w-full rounded-sm border border-[#edf0ed] bg-white text-xs font-medium text-[#1c2b23] shadow-none hover:bg-[#f5f8f4]"
                >
                  <svg
                    viewBox="0 0 48 48"
                    className="size-4"
                    aria-hidden="true"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.42 38.06 46.98 31.84 46.98 24.55Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.9 2.3-8.18 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                    />
                  </svg>

                  Continue with Google
                </Button>

              </FieldGroup>
            </form>
          </CardContent>

          {/* Sign Up Link */}
          <div className="px-4 py-4 text-center flex  justify-center">
            <FieldDescription className="text-[11px] text-[#5c665e]">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#963f27] hover:underline"
              >
                Create an account
              </Link>
            </FieldDescription>
          </div>

        </Card>

        
        <p className="mt-5 text-center text-[9px] leading-4 tracking-wide text-[#5c665e]">
          © 2025 CIVORA Foundation · Dhaka Civic Development Initiative ·{" "}
          <Link href="" className="underline underline-offset-2">
            Privacy & Terms
          </Link>
        </p>

      </div>
    </main>
  );
}
