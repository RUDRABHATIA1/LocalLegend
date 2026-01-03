'use client'

import React, { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useCart } from '../Context/CartContext'


const LoginModal = ({ onClose }: { onClose: () => void }) => {

  const [isSignUp, setIsSignUp] = useState(false)

  const {showLogin,setShowLogin} = useCart()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  // Disable scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSignUp) {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      })
      if (res.ok) {
        alert('Account created! Please login.')
        setIsSignUp(false)
      } else {
        alert('Signup failed')
      }
    } else {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (result?.error) alert(result.error)
      else window.location.href = '/'
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/30 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4">
        {/* Close button */}
        <button
          onClick={()=>setShowLogin(!showLogin)}
          className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-xl font-bold"
        >
          ✕
        </button>

        {/* Login/Signup box */}
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isSignUp && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
          >
            
            Sign In with Google
          </button>

          <p className="text-center text-gray-600">
            {isSignUp
              ? 'Already have an account?'
              : "Don't have an account?"}{' '}
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
