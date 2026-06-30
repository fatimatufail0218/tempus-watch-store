"use client";

import { Input } from "@/components/ui/input";
import { registerUser, RegisterState } from "@/action/user";
import Link from "next/link";
import { useActionState } from "react";
import { IconBrandGoogle } from "@tabler/icons-react";

const initialState: RegisterState = {};

const Register = () => {
  const [state, formAction, isPending] = useActionState(
    registerUser,
    initialState
  );

  return (
    <section className="min-h-screen bg-white">
      {/* Logo */}
      <div className="border-b border-black/10 px-6 py-6">
        <Link href="/" className="flex gap-2 items-center w-fit">
          <span className="text-[26px] tracking-[4px] font-light">
            TEMPUS
          </span>

          <span className="w-px h-4 bg-[#9A7428]"></span>

          <span className="text-[10px] tracking-[3px] text-[#9A7428] uppercase">
            Est. MMXXIV
          </span>
        </Link>
      </div>

      <div className="max-w-[420px] mx-auto px-6 py-16">
        <div className="text-center">

          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-10 bg-[#9A7428]" />
            <p className="uppercase text-[10px] tracking-[4px] text-[#9A7428]">
              Join Tempus
            </p>
            <div className="h-px w-10 bg-[#9A7428]" />
          </div>

          <h1 className="text-[54px] leading-none font-light">
            Create{" "}
            <span className="italic text-[#9A7428]">
              Account
            </span>
          </h1>

          <p className="mt-4 text-[14px] text-[#6e6e6e]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-black underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <button
          type="button"
          className="mt-8 h-12 w-full border border-black/10 text-[11px] uppercase tracking-[3px] flex items-center justify-center gap-3"
        >
          <IconBrandGoogle size={18} />
          Continue With Google
        </button>

        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-black/10" />
          <span className="text-[11px] tracking-[3px] text-gray-500">
            OR
          </span>
          <div className="flex-1 h-px bg-black/10" />
        </div>

        <form action={formAction}>

          <div>
            <label className="text-[10px] tracking-[3px] uppercase text-[#7A7670]">
              Full Name
            </label>

            <Input
              name="firstname"
              placeholder="John Doe"
              className="mt-2 h-12 rounded-none"
            />
          </div>

          <div className="mt-5">
            <label className="text-[10px] tracking-[3px] uppercase text-[#7A7670]">
              Email Address
            </label>

            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="mt-2 h-12 rounded-none"
            />
          </div>

          <div className="mt-5">
            <label className="text-[10px] tracking-[3px] uppercase text-[#7A7670]">
              Password
            </label>

            <Input
              name="password"
              type="password"
              placeholder="Min. 8 characters"
              className="mt-2 h-12 rounded-none"
            />
          </div>

          <div className="mt-5">
            <label className="text-[10px] tracking-[3px] uppercase text-[#7A7670]">
              Confirm Password
            </label>

            <Input
              type="password"
              placeholder="********"
              className="mt-2 h-12 rounded-none"
            />
          </div>

          {state?.error && (
            <p className="mt-3 text-sm text-red-500">
              {state.error}
            </p>
          )}

          <button
            disabled={isPending}
            className="mt-6 h-12 w-full bg-black text-white uppercase text-[11px] tracking-[3px]"
          >
            {isPending
              ? "Creating..."
              : "Create Account"}
          </button>

          <p className="mt-6 text-center text-[12px] text-[#7A7670]">
            By creating an account you agree to our
            {" "}
            <span className="underline">
              Terms
            </span>
            {" "}and{" "}
            <span className="underline">
              Privacy Policy
            </span>
          </p>

        </form>
      </div>
    </section>
  );
};

export default Register;