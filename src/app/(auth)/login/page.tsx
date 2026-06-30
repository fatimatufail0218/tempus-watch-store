"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useActionState } from "react";
import {
  loginUser,
  LoginState,
  signInWithGoogle,
} from "@/action/user";
import { IconBrandGoogle } from "@tabler/icons-react";

const initialState: LoginState = {};

export default function Login() {
  const [state, formAction, isPending] = useActionState(
    loginUser,
    initialState
  );

  return (
    <section className="min-h-screen bg-white">

      {/* Logo */}

      <div className="border-b border-black/[0.08] px-6 py-6">
        <Link
          href="/"
          className="flex items-center gap-2 w-fit"
        >
          <span className="text-[26px] tracking-[4px] font-light">
            TEMPUS
          </span>

          <span className="w-px h-4 bg-[#9A7428]" />

          <span className="text-[10px] uppercase tracking-[3px] text-[#9A7428]">
            Est. MMXXIV
          </span>
        </Link>
      </div>

      {/* Form */}

      <div className="max-w-[420px] mx-auto px-6 py-16">

        <div className="text-center">

          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-10 bg-[#9A7428]" />
            <p className="uppercase text-[10px] tracking-[4px] text-[#9A7428]">
              Welcome Back
            </p>
            <div className="h-px w-10 bg-[#9A7428]" />
          </div>

          <h1 className="text-[54px] leading-none font-light">
            Sign{" "}
            <span className="italic text-[#9A7428]">
              In
            </span>
          </h1>

          <p className="mt-4 text-[14px] text-[#6e6e6e]">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-black underline"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Google */}

        <form action={signInWithGoogle}>
          <button
            type="submit"
            className="mt-8 h-12 w-full border border-black/[0.08] text-[11px] uppercase tracking-[3px] flex items-center justify-center gap-3"
          >
            <IconBrandGoogle size={18} />
            Continue With Google
          </button>
        </form>

        {/* Divider */}

        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-black/[0.08]" />
          <span className="text-[11px] tracking-[3px] text-[#7A7670]">
            OR
          </span>
          <div className="flex-1 h-px bg-black/[0.08]" />
        </div>

        {/* Form */}

        <form action={formAction}>

          <div>
            <label className="uppercase text-[10px] tracking-[3px] text-[#7A7670]">
              Email Address
            </label>

            <Input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="mt-2 h-12 rounded-none"
            />
          </div>

          <div className="mt-5">
            <label className="uppercase text-[10px] tracking-[3px] text-[#7A7670]">
              Password
            </label>

            <Input
              type="password"
              name="password"
              placeholder="********"
              className="mt-2 h-12 rounded-none"
            />
          </div>

          {state?.error && (
            <p className="text-red-500 text-sm mt-4">
              {state.error}
            </p>
          )}

          <button
            disabled={isPending}
            className="mt-6 h-12 w-full bg-black text-white uppercase text-[11px] tracking-[3px]"
          >
            {isPending
              ? "Signing In..."
              : "Sign In"}
          </button>

        </form>
      </div>
    </section>
  );
}