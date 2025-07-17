"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { name: "Overview", href: "/dashboard" },
  { name: "Passwords", href: "/dashboard/passwords" },
  { name: "Credit Cards", href: "/dashboard/cards" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border p-4 hidden md:block">
      <h2 className="text-2xl font-bold text-primary mb-6">NoPass</h2>
      <nav className="space-y-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
              pathname === link.href
                ? "bg-muted text-primary"
                : "hover:bg-muted/50 text-foreground/70"
            )}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
