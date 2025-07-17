"use client"

import { useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "react-hot-toast"

const passwordSchema = z.object({
  website: z.string().min(2, "Website name is too short"),
  username: z.string().min(2, "Username is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
})

type PasswordFormValues = z.infer<typeof passwordSchema>

export default function PasswordsPage() {
  const [savedPasswords, setSavedPasswords] = useState<PasswordFormValues[]>([])
  const [showPasswords, setShowPasswords] = useState(false)

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      website: "",
      username: "",
      password: "",
    },
  })

  useEffect(() => {
  async function fetchPasswords() {
    const res = await fetch("/api/passwords")
    const result = await res.json()
    if (result.success) setSavedPasswords(result.data)
  }

  fetchPasswords()
}, [])

  const onSubmit = async (data: PasswordFormValues) => {
     try {
    const res = await fetch("/api/passwords", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    const result = await res.json()

    if (result.success) {
      setSavedPasswords((prev) => [...prev, data])
      form.reset()
      toast.success("Password saved successfully!")
    } else {
      toast.error("Failed to save password.")
    }
  } catch (error) {
    console.error("Error:", error)
    toast.error("Something went wrong.")
  }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Card className="border border-border bg-muted/30 backdrop-blur-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Add New Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., facebook.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username / Email</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., john.doe@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showPasswords ? "text" : "password"}
                        placeholder="e.g., strong password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <Button type="submit" className="rounded-full">
                  Save Password
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPasswords((prev) => !prev)}
                  className="text-sm"
                >
                  {showPasswords ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" /> Hide Passwords
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" /> Show Passwords
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-primary mb-4">Your Passwords</h2>
        {savedPasswords.length === 0 ? (
          <p className="text-muted-foreground">No passwords saved yet.</p>
        ) : (
          <div className="space-y-4">
            {savedPasswords.map((entry, index) => (
              <Card
                key={index}
                className="border border-border bg-muted/20 backdrop-blur-sm"
              >
                <CardContent className="py-4 space-y-1">
                  <p>
                    <span className="font-medium text-muted-foreground">Website:</span>{" "}
                    {entry.website}
                  </p>
                  <p>
                    <span className="font-medium text-muted-foreground">Username:</span>{" "}
                    {entry.username}
                  </p>
                  <p>
                    <span className="font-medium text-muted-foreground">Password:</span>{" "}
                    {showPasswords ? entry.password : "••••••••"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
