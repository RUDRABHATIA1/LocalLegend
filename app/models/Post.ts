// /models/Post.ts
import mongoose, { Schema, Document } from 'mongoose'

export interface IPost extends Document {
  name: string
  content: string
  image?: string
  createdAt: Date
}

const PostSchema: Schema = new Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)
