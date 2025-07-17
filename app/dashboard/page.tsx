"use client"

import React from "react"
import { ShieldCheck, KeyRound, CreditCard, CloudCheck } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-[84vh] p-6 md:p-10 text-foreground bg-background">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-primary">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
          Welcome to <span className="text-black dark:text-white font-bold">No<span className="text-primary">Pass</span></span> — your secure command center for managing all your digital credentials. 
          Here&apos;s a quick overview of what you can do.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-xl border border-border bg-muted/20 hover:bg-muted/40 p-5 backdrop-blur-sm transition-all">
          <ShieldCheck className="text-green-400 w-8 h-8 mb-3" />
          <h2 className="text-xl font-bold mb-1">Military-Grade Encryption</h2>
          <p className="text-muted-foreground text-sm">
            Your data is protected with AES-256 encryption and zero-knowledge architecture. Only you can access your credentials.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-muted/20 hover:bg-muted/40 p-5 backdrop-blur-sm transition-all">
          <KeyRound className="text-yellow-400 w-8 h-8 mb-3" />
          <h2 className="text-xl font-bold mb-1">Password Vault</h2>
          <p className="text-muted-foreground text-sm">
            Store and manage all your passwords securely. Easily add, edit, search, or delete credentials in one place.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-muted/20 hover:bg-muted/40 p-5 backdrop-blur-sm transition-all">
          <CreditCard className="text-blue-400 w-8 h-8 mb-3" />
          <h2 className="text-xl font-bold mb-1">Credit Card Locker</h2>
          <p className="text-muted-foreground text-sm">
            Securely save your debit and credit card details for quick access while shopping online or managing subscriptions.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-muted/20 hover:bg-muted/40 p-5 backdrop-blur-sm transition-all">
          <CloudCheck className="text-purple-400 w-8 h-8 mb-3" />
          <h2 className="text-xl font-bold mb-1">Cross-Device Sync</h2>
          <p className="text-muted-foreground text-sm">
            Seamlessly sync your data across all devices in real time using end-to-end encryption. No cloud leaks. Ever.
          </p>
        </div>
      </div>
    </div>
  )
}
