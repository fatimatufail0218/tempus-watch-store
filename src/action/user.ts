// src/action/user.ts
"use server";

import bcrypt from "bcryptjs";
import { getUserByEmail, createUser } from "@/lib/queries/user";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { CredentialsSignin } from "next-auth";

export type RegisterState = {
  error?: string;
  success?: boolean;
};

export async function registerUser(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!firstname || !email || !password) {
    return { error: "Please fill all fields" };
  }

  let shouldRedirect = false;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const name = `${firstname} ${lastname}`;

    await createUser(name, email, hashedPassword);
    shouldRedirect = true;
  } catch (err) {
    return { error: "Something went wrong" };
  }

  if (shouldRedirect) {
    redirect("/login");
  }

  return { success: true };
}

export type LoginState = {
  error?: string;
};

export async function loginUser(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
     if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof (error as { digest?: string }).digest === "string" &&
      (error as { digest: string }).digest.includes("NEXT_REDIRECT")
    ) {
      throw error;
    }
    if (error instanceof CredentialsSignin) {
      return { error: error.code ?? "Invalid email or password" };
    }
    return { error: "Something went wrong" };
  }

  redirect("/");
}

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}

export async function logoutUser() {
  await signOut({ redirectTo: "/" });
}