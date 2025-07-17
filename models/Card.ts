import mongoose from "mongoose"

const CardSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    cardNumber: { type: String, required: true },
    cvv: { type: String, required: true },
    expiry: { type: String, required: true },
  },
  { timestamps: true }
)

export const Card = mongoose.models.Card || mongoose.model("Card", CardSchema)
