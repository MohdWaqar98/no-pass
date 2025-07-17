import { Schema, models, model } from "mongoose"

const passwordSchema = new Schema({
  website: String,
  username: String,
  password: String,
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export const Password = models.Password || model("Password", passwordSchema)
