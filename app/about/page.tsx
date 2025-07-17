"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function AboutPage() {
  const { userId } = useAuth();
  
    if (userId) {
      redirect("/dashboard");
    }
  return (
    <div className="min-h-[84vh] flex items-center justify-center bg-background text-foreground px-6 py-6">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          About No <span className="text-primary">Pass</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          NoPass is your ultimate password manager that lets you securely store and manage passwords, usernames, and credit card details for all your online accounts. With a focus on cutting-edge security and sleek design, NoPass ensures your credentials are always safe and accessible — only to you.
        </p>
        <p className="text-muted-foreground text-lg">
          Whether you&apos;re an individual or a team, NoPass is built to scale with your digital life. No tracking. No leaks. No compromise. Just total control and military-grade encryption at your fingertips.
        </p>
        <Link href="/sign-in">
          <Button className="mt-4 px-6 py-3 rounded-full shadow-xl">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
}
