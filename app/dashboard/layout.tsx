// app/dashboard/layout.tsx
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Sidebar from "@/components/dashboard/Sidebar"
import { Toaster } from "react-hot-toast"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">{children}
        <Toaster position="top-right" reverseOrder={false} />
      </main>
    </div>
  )
}
