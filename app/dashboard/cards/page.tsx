"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEffect, useState } from "react"
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
import toast from "react-hot-toast"

const cardSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Card number must be at least 16 digits")
    .max(19, "Card number too long")
    .regex(/^\d+$/, "Only digits allowed"),
  cvv: z
    .string()
    .length(3, "CVV must be 3 digits")
    .regex(/^\d+$/, "Only digits allowed"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format should be MM/YY"),
})

type CardFormValues = z.infer<typeof cardSchema>

export default function CreditCardsPage() {
  const [savedCards, setSavedCards] = useState<CardFormValues[]>([])
  const [showCVV, setShowCVV] = useState(false)

  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardNumber: "",
      cvv: "",
      expiryDate: "",
    },
  })
  useEffect(() => {
    async function fetchCards() {
      try {
        const res = await fetch("/api/cards")
        const data = await res.json()
        if (!res.ok) throw new Error("Failed to fetch cards")
        setSavedCards(data)
      } catch {
        toast.error("Could not load cards")
      }
    }
    fetchCards()
  }, [])

  const onSubmit = async (data: CardFormValues) => {
    try {
      const payload = {
        ...data,
        expiry: data.expiryDate,
      }

      const res = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Failed to save card")
      await res.json()

      setSavedCards((prev) => [...prev, { ...data }])
      form.reset()
      toast.success("Card saved successfully!")
    } catch (err) {
      console.error(err)
      toast.error("Failed to save card")
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Card className="border border-border bg-muted/30 backdrop-blur-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Add New Credit Card</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234 5678 9012 3456" maxLength={19} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input
                        type={showCVV ? "text" : "password"}
                        placeholder="123"
                        maxLength={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" maxLength={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <Button type="submit" className="rounded-full">
                  Save Card
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-sm"
                  onClick={() => setShowCVV(!showCVV)}
                >
                  {showCVV ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-1" /> Hide CVV
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-1" /> Show CVV
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-primary mb-4">Your Saved Cards</h2>
        {savedCards.length === 0 ? (
          <p className="text-muted-foreground">No cards saved yet.</p>
        ) : (
          <div className="space-y-4">
            {savedCards.map((card, index) => (
              <Card
                key={index}
                className="border border-border bg-muted/20 backdrop-blur-sm"
              >
                <CardContent className="py-4 space-y-1">
                  <p>
                    <span className="font-medium text-muted-foreground">Card Number:</span>{" "}
                    •••• •••• •••• {card.cardNumber.slice(-4)}
                  </p>
                  <p>
                    <span className="font-medium text-muted-foreground">Expiry Date:</span>{" "}
                    {card.expiryDate}
                  </p>
                  <p>
                    <span className="font-medium text-muted-foreground">CVV:</span>{" "}
                    {showCVV ? card.cvv : "•••"}
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
