'use client'

import React, { useEffect, useState } from 'react'
import { PostType } from '../Context/CartContext'
import { formatDistanceToNow } from 'date-fns'
import { MessageCircle, Phone } from 'lucide-react'

type PostCardProps = {
  post: PostType
  
}

const PostCard = ({ post }: PostCardProps) => {
  const [timeAgo, setTimeAgo] = useState('')

  useEffect(() => {
    const updateTime = () => {
      setTimeAgo(formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }))
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [post.createdAt])

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{post.name}</span>
        <span className="text-gray-500 text-sm">{timeAgo}</span>
      </div>
      <p className="mb-3">{post.content}</p>

      {/* Display image if uploaded */}
      {post.image && (
        <img
          src={post.image}
          alt="Post Image"
          className="mb-3 rounded-md max-h-96 w-full object-cover"
        />
      )}

      <div className="flex gap-4">
        <button className="flex items-center gap-1 text-blue-600 hover:underline">
          <MessageCircle size={16} /> Chat
        </button>
        <button className="flex items-center gap-1 text-green-600 hover:underline">
          <Phone size={16} /> Call
        </button>
      </div>
    </div>
  )
}

export default PostCard
