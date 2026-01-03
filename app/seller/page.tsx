'use client'

import React, { useState } from 'react'
import { MapPin, Upload, Store, Phone, ImageIcon } from 'lucide-react'

const RegisterStore = () => {
  const [logo, setLogo] = useState<File | null>(null)
  const [storeName, setStoreName] = useState('')
  const [description, setDescription] = useState('')
  const [contact, setContact] = useState('')
  const [address, setAddress] = useState('')
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => alert('Location permission denied')
    )
  }

  const handleSubmit = () => {
    if (!storeName || !contact || !address) {
      alert('Please fill required fields')
      return
    }

    console.log({
      storeName,
      description,
      contact,
      address,
      location,
      logo,
    })

    alert('Store Registered (mock)')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-6 md:p-8">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-2xl bg-blue-100">
            <Store className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Register Your Store</h1>
            <p className="text-sm text-gray-500">
              Start selling to customers nearby
            </p>
          </div>
        </div>

        {/* LOGO UPLOAD */}
        <div className="flex flex-col items-center mb-8">
          <label className="relative group cursor-pointer">
            <div className="w-28 h-28 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden bg-blue-50">
              {logo ? (
                <img
                  src={URL.createObjectURL(logo)}
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="text-gray-400" size={28} />
              )}
            </div>

            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <Upload className="text-white" size={18} />
            </div>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setLogo(e.target.files?.[0] || null)}
            />
          </label>

          <p className="text-xs text-gray-500 mt-2">
            Upload store logo or photo
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Store / Business Name *"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="input"
          />

          <textarea
            placeholder="Short description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="input resize-none"
          />

          <div className="relative">
            
            <input
              type="tel"
              placeholder="Contact Number *"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="input "
            />
          </div>

          <textarea
            placeholder="Store Address *"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={2}
            className="input resize-none"
          />

          {/* LOCATION */}
          <button
            onClick={handleLocation}
            className={`flex items-center justify-center gap-2 w-full py-2 rounded-xl text-sm transition
              ${
                location
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 hover:bg-blue-200'
              }`}
          >
            <MapPin size={16} />
            {location ? 'Location Added' : 'Share Live Location'}
          </button>

          {location && (
            <p className="text-xs text-gray-500 text-center">
              Location saved successfully
            </p>
          )}
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-medium transition"
        >
          Register Store
        </button>
      </div>
    </div>
  )
}

export default RegisterStore
