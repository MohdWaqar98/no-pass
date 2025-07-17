"use client"

import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/nextjs"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import Aurora from "@/blocks/Backgrounds/Aurora/Aurora"
import { useAuth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

// Poppins ExtraBold for title
const poppins = Poppins({
  weight: "800",
  subsets: ["latin"],
})

export default function Home() {
  const { userId } = useAuth();

  if (userId) {
    redirect("/dashboard");
  }
  
  return (
    <main className="relative w-full min-h-[calc(100vh-64px)] overflow-hidden flex items-center justify-center bg-background text-foreground">
      <div className="absolute inset-0">
        <Aurora />
      </div>
      <div className="text-center px-6 z-10">
        <h1
          className={cn(
            "text-5xl md:text-6xl lg:text-7xl font-extrabold",
            poppins.className
          )}
        >
          No<span className="text-primary">Pass</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
          A modern password manager to securely store your login credentials and credit card details across websites.
        </p>
        <div className="mt-8">
          <SignInButton mode="redirect">
            <Button className="text-sm px-6 py-3 rounded-full shadow-md hover:opacity-90 transition-all">
              Get Started – Sign In
            </Button>
          </SignInButton>
        </div>
      </div>
    </main>
  )
}
