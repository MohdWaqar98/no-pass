import { type Metadata } from "next"
import {
  ClerkProvider
} from "@clerk/nextjs"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "NoPass | Password & Card Manager",
  description: "NoPass is your secure command center for managing passwords and credit cards. Enjoy military-grade encryption, autofill, cross-device sync, and more.",
  icons: {
    icon: "/icons8-key-96.png",
    shortcut: "/icons8-key-96.png",
    apple: "/icons8-key-96.png",
    other: [
      { rel: "icon", url: "/icons8-key-96.png" },
      { rel: "apple-touch-icon", url: "/icons8-key-96.png" }
    ]
  },
  manifest: "/manifest.json",
  generator: "Next.js",
  applicationName: "NoPass",
  keywords: ["password manager", "credit card locker", "secure", "encryption", "NoPass"],
  authors: [{ name: "NoPass Team" }],
  themeColor: "#18181b"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="min-h-[calc(100vh-64px-64px)]">{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
