// /pages/api/posts.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/mongodb'
import Post from '@/models/Post'
import { uploadImage } from '@/services/cloudinary'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  if (req.method === 'GET') {
    const posts = await Post.find({}).sort({ createdAt: -1 })
    return res.status(200).json(posts)
  }

  if (req.method === 'POST') {
    try {
      const { name, content, image } = req.body

      let imageUrl: string | undefined
      if (image) {
        imageUrl = await uploadImage(image)
      }

      const newPost = await Post.create({ name, content, image: imageUrl })
      return res.status(201).json(newPost)
    } catch (err) {
      return res.status(500).json({ error: 'Failed to create post' })
    }
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
