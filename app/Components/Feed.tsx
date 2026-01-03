// /components/Feed.tsx
'use client'

import React from 'react'
import { useCart } from '../Context/CartContext'
import CreatePost from './CreatePost'
import PostCard from './PostCard'

const Feed = () => {
  const { posts } = useCart()

  return (
    <div className="max-w-xl mx-auto mt-6">
      <CreatePost />
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts yet</p>
      ) : (
        posts.map((post, index) => {
          const key = post._id ?? index
          return <PostCard key={key} post={post} />
        })
      )}
    </div>
  )
}

export default Feed
