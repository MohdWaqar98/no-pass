"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
  ]

  const privateLinks = [
    { name: "Overview", href: "/dashboard" },
    { name: "Passwords", href: "/dashboard/passwords" },
    { name: "Credit Card", href: "/dashboard/cards" },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-lg bg-background/70">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-foreground">
          No<span className="text-primary">Pass</span>
        </Link>
        <SignedOut>
          <div className="hidden md:flex items-center space-x-8">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-foreground/70"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </SignedOut>
        <div className="flex items-center gap-3">
          {mounted && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="border-border hover:bg-muted/50 relative"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] transition-all rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
          <SignedOut>
            <div className="hidden sm:flex gap-2">
              <SignInButton>
                <Button
                  variant="ghost"
                  className="text-sm px-3 h-9 border border-border rounded-full hover:bg-muted/50 text-foreground"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-yellow-400 text-black rounded-full text-sm px-4 h-9 hover:bg-yellow-300 shadow-md">
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
            >
              <Menu />
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2 bg-background/95 border-t border-border">
          <SignedOut>
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-foreground/70"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-2">
              <SignInButton>
                <Button
                  variant="ghost"
                  className="text-sm w-full h-9 border border-border rounded-full hover:bg-muted/50 text-foreground"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-yellow-400 text-black rounded-full text-sm w-full h-9 hover:bg-yellow-300 shadow-md">
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            {privateLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-foreground/70"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </SignedIn>
        </div>
      )}
    </nav>
  )
}
