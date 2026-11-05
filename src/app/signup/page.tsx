
"use client";

import { useState } from "react";
import Link from "next/link";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  User,
  Mail,
  Link2,
  LockKeyhole,
  Eye,
  EyeOff,
  CircleUserRound,
  ArrowRight,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignUpForm() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Password Requirements
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);

  const handleEmailSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Password Validation
    if (!hasMinLength || !hasUppercase || !hasLowercase) {
      toast.error("Please fulfill all password requirements.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      photo: string;
    };

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.photo || undefined,
    });

    if (data) {
      toast.success("You have successfully created your account");
      router.push("/");
    }

    if (error) {
      toast.error(error.message || "Create account failed!");
    }
  };

  const handleGoogleSignup = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <main className="flex py-20 flex-col items-center justify-center bg-[#f1faf1] px-4 transition-colors dark:bg-[#17251c]">
      <div className="w-full max-w-md">
        <Card className="rounded-md border border-[#e5eee5] bg-white px-5 py-6 shadow-none transition-colors sm:px-7 dark:border-[#34483b] dark:bg-[#203329]">

          {/* Header */}
          <CardHeader className="mb-5 space-y-2 p-0 text-center">
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-[#163a2b] dark:text-[#edf4ed]">
              Create Your Account
            </h1>

            <p className="mx-auto max-w-[280px] text-xs leading-5 text-[#5c665e] dark:text-[#aab9ad]">
              Join CIVORA and become part of a community
              creating positive change.
            </p>
          </CardHeader>

          <CardContent className="p-0">
            <form onSubmit={handleEmailSignup}>
              <FieldGroup className="gap-4">

                {/* Full Name */}
                <Field className="gap-2">
                  <FieldLabel
                    htmlFor="name"
                    className="text-[11px] font-semibold text-[#1c2b23] dark:text-[#dce8dd]"
                  >
                    Full Name
                  </FieldLabel>

                  <div className="relative">
                    <User className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#7b8980] dark:text-[#8fa995]" />

                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      className="h-9 rounded-sm border-0 bg-transparent pl-9 text-xs text-[#1c2b23] shadow-none placeholder:text-[#b3bdb6] focus-visible:ring-1 focus-visible:ring-[#8fa995] dark:text-[#edf4ed] dark:placeholder:text-[#78877c]"
                    />
                  </div>
                </Field>

                {/* Email */}
                <Field className="gap-2">
                  <FieldLabel
                    htmlFor="email"
                    className="text-[11px] font-semibold text-[#1c2b23] dark:text-[#dce8dd]"
                  >
                    Email Address
                  </FieldLabel>

                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#7b8980] dark:text-[#8fa995]" />

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                      className="h-9 rounded-sm border-0 bg-transparent pl-9 text-xs text-[#1c2b23] shadow-none placeholder:text-[#b3bdb6] focus-visible:ring-1 focus-visible:ring-[#8fa995] dark:text-[#edf4ed] dark:placeholder:text-[#78877c]"
                    />
                  </div>
                </Field>

                {/* Profile Photo URL */}
                <Field className="gap-2">
                  <div className="flex items-center justify-between">
                    <FieldLabel
                      htmlFor="photo"
                      className="text-[11px] font-semibold text-[#1c2b23] dark:text-[#dce8dd]"
                    >
                      Profile Photo URL
                    </FieldLabel>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Link2 className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#7b8980] dark:text-[#8fa995]" />

                      <Input
                        id="photo"
                        name="photo"
                        type="url"
                        placeholder="Paste your profile photo URL"
                        className="h-9 rounded-sm border-0 bg-transparent pl-9 text-xs text-[#1c2b23] shadow-none placeholder:text-[#b3bdb6] focus-visible:ring-1 focus-visible:ring-[#8fa995] dark:text-[#edf4ed] dark:placeholder:text-[#78877c]"
                      />
                    </div>

                    <div className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-[#e5eee5] text-[#62766a] dark:bg-[#344d3b] dark:text-[#c5d8c7]">
                      <CircleUserRound className="size-4" />
                    </div>
                  </div>
                </Field>

                {/* Password */}
                <Field className="gap-2">
                  <FieldLabel
                    htmlFor="password"
                    className="text-[11px] font-semibold text-[#1c2b23] dark:text-[#dce8dd]"
                  >
                    Password
                  </FieldLabel>

                  <div className="relative">
                    <LockKeyhole className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#7b8980] dark:text-[#8fa995]" />

                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-9 rounded-sm border-0 bg-transparent px-9 pr-10 text-xs text-[#1c2b23] shadow-none placeholder:text-[#b3bdb6] focus-visible:ring-1 focus-visible:ring-[#8fa995] dark:text-[#edf4ed] dark:placeholder:text-[#78877c]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-[#7b8980] transition-colors hover:text-[#1a4332] dark:text-[#8fa995] dark:hover:text-[#edf4ed]"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="size-3.5" />
                      ) : (
                        <Eye className="size-3.5" />
                      )}
                    </button>
                  </div>
                </Field>

                {/* Password Requirements */}
                <div className="rounded-sm bg-[#edf5ed] px-2 py-2 dark:bg-[#263a2d]">
                  <p className="mb-1.5 text-[9px] font-medium tracking-wide text-[#65766a] uppercase dark:text-[#aab9ad]">
                    Password Requirements
                  </p>

                  <div className="space-y-1 text-[10px]">
                    <p
                      className={`flex items-center gap-1.5 ${
                        hasMinLength
                          ? "text-green-700 dark:text-green-400"
                          : "text-[#46564b] dark:text-[#bdcabe]"
                      }`}
                    >
                      <span
                        className={`size-2 rounded-full border ${
                          hasMinLength
                            ? "border-green-600 bg-green-600"
                            : "border-[#7b8980] dark:border-[#8fa995]"
                        }`}
                      />
                      At least 6 characters
                    </p>

                    <p
                      className={`flex items-center gap-1.5 ${
                        hasUppercase
                          ? "text-green-700 dark:text-green-400"
                          : "text-[#46564b] dark:text-[#bdcabe]"
                      }`}
                    >
                      <span
                        className={`size-2 rounded-full border ${
                          hasUppercase
                            ? "border-green-600 bg-green-600"
                            : "border-[#7b8980] dark:border-[#8fa995]"
                        }`}
                      />
                      At least one uppercase letter
                    </p>

                    <p
                      className={`flex items-center gap-1.5 ${
                        hasLowercase
                          ? "text-green-700 dark:text-green-400"
                          : "text-[#46564b] dark:text-[#bdcabe]"
                      }`}
                    >
                      <span
                        className={`size-2 rounded-full border ${
                          hasLowercase
                            ? "border-green-600 bg-green-600"
                            : "border-[#7b8980] dark:border-[#8fa995]"
                        }`}
                      />
                      At least one lowercase letter
                    </p>
                  </div>
                </div>

                {/* Create Account Button */}
                <Button
                  type="submit"
                  className="mt-1 h-10 w-full rounded-sm bg-[#163f32] text-xs font-semibold text-white shadow-none hover:bg-[#24513c] dark:bg-[#8fa995] dark:text-[#14251a] dark:hover:bg-[#a5bba9]"
                >
                  Create Account
                  <ArrowRight className="ml-1 size-3.5" />
                </Button>

                <FieldSeparator className="text-[9px] tracking-widest text-[#7b8980] [&_[data-slot=field-separator-content]]:bg-white dark:text-[#8fa995] dark:[&_[data-slot=field-separator-content]]:bg-[#203329]">
                  OR
                </FieldSeparator>

                {/* Google Signup */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignup}
                  className="h-10 w-full rounded-sm border-0 bg-transparent text-xs font-medium text-[#1c2b23] shadow-none hover:bg-[#f5f8f4] dark:text-[#edf4ed] dark:hover:bg-[#34483b]"
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

                {/* Login Link */}
                <FieldDescription className="pt-1 text-center text-[11px] text-[#5c665e] dark:text-[#aab9ad]">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#a64e3d] hover:underline dark:text-[#e99b87]"
                  >
                    Log In
                  </Link>
                </FieldDescription>

              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        <p className="mt-5 text-center text-[9px] font-medium tracking-[0.13em] text-[#718075] uppercase dark:text-[#8fa995]">
          Institutional Node · Dhaka Public Records Registry
        </p>
      </div>
    </main>
  );
}
