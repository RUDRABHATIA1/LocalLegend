// /app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'
// import clientPromise from '@/lib/mongodb'
import clientPromise from '../../lib/mongodb'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('locallegend')
    const posts = await db.collection('posts').find({}).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(posts)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db('locallegend')

    const { name, content, image } = await req.json()
    let imageUrl: string | undefined

    if (image) {
      const upload = await cloudinary.uploader.upload(image)
      imageUrl = upload.secure_url
    }

    const newPost = {
      name,
      content,
      image: imageUrl,
      createdAt: new Date().toISOString()
    }

    const result = await db.collection('posts').insertOne(newPost)
    return NextResponse.json({ ...newPost, _id: result.insertedId })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
