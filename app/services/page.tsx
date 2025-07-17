"use client"

import React from "react"
import { CheckCircle } from "lucide-react"
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const services = [
  {
    title: "Encrypted Vault",
    description:
      "All your passwords and sensitive data are encrypted with AES-256 before they leave your device.",
  },
  {
    title: "Auto-fill & Auto-login",
    description:
      "Seamlessly log into your accounts with one-click autofill for websites and apps.",
  },
  {
    title: "Credit Card Storage",
    description:
      "Securely save and manage your card details for faster and safer payments.",
  },
  {
    title: "Cross-Device Sync",
    description:
      "Sync your credentials across all devices in real-time using zero-knowledge protocol.",
  },
  {
    title: "Password Generator",
    description:
      "Generate strong, uncrackable passwords with customizable rules and copy on click.",
  },
]

export default function ServicesPage() {
  const { userId } = useAuth();
  
    if (userId) {
      redirect("/dashboard");
    }
  return (
    <div className="min-h-[84vh] bg-background text-foreground pt-20 px-6 pb-10 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary">Our Services</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {services.map((service, index) => (
            <div
              key={index}
              className="border border-border rounded-xl p-5 backdrop-blur-sm bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <CheckCircle className="text-green-500 mb-3" />
              <h2 className="text-xl font-bold">{service.title}</h2>
              <p className="text-muted-foreground mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
