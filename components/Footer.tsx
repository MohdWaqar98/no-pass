"use client"

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background text-foreground">
      <div className="text-center text-xs py-4 text-muted-foreground bg-background/50">
        © {new Date().getFullYear()} <span className="text-primary font-semibold">NoPass</span>. Crafted with ❤️ by{" "}
        <span className="text-primary font-semibold">Mohd Waqar Ahmed</span>
      </div>
    </footer>
  )
}
