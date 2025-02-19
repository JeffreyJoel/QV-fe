"use client"

import { SignUpForm } from "@/components/signup/signup-form"
import { Boxes } from "lucide-react"
import Link from "next/link"
import { Mona_Sans as FontSans } from "next/font/google"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto">
        <div className="h-full flex-col  p-10 text-white dark:border-r lg:flex">
          {/* <div className="absolute inset-0 bg-black" /> */}
        </div>
        <div className="p-4  lg:p-8">
          {/* <Link href="/" className="flex items-center text-lg font-medium">
            <Boxes className="mr-2 h-6 w-6" />
            <span className="font-bold">Quadratic Voting</span>
          </Link> */}
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Welcome to Quadratic Voting</h1>
              <p className="text-sm text-muted-foreground">
                Connect your wallet and enter your matriculation number to get started
              </p>
            </div>
            <SignUpForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

