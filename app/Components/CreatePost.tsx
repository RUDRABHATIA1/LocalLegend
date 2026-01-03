// /components/CreatePost.tsx
'use client'

import React, { useState } from 'react'
import { useCart } from '../Context/CartContext'
import { Plus, ImageIcon } from 'lucide-react'

const CreatePost = () => {
  const { addPost } = useCart()
  const [content, setContent] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [image, setImage] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handlePost = () => {
    if (!content.trim() && !image) return
    addPost('Rudra Bhatia', content, image || undefined)
    setContent('')
    setImage(null)
    setShowInput(false)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2">
        <Plus size={24} className="cursor-pointer hover:text-blue-600" onClick={() => setShowInput(!showInput)} />
        <span className="font-semibold">Create Post</span>
      </div>

      {showInput && (
        <div className="mt-2 flex flex-col gap-2">
          <textarea
            rows={3}
            placeholder="What's on your mind?"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="border rounded-md p-2 w-full resize-none focus:outline-blue-500"
          />
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1 cursor-pointer text-gray-600 hover:text-gray-800">
              <ImageIcon size={20} /> Add Image
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {image && <span className="text-sm text-green-600">Image added</span>}
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={handlePost}>
            Post
          </button>
        </div>
      )}
    </div>
  )
}

export default CreatePost
