'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  MessagesSquare,
  Search,
  ShoppingCart,
  UserRound,
  ChevronRight,
  ChevronDown,
  Mic,
  LogOut,
  Store,
  Menu,
  X,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../Context/CartContext'
import { useRouter } from 'next/navigation'
import LoginComponent from './LoginComp'
import { useSession, signOut } from 'next-auth/react'

const PRODUCTS = ['Automobile', 'Beauty']
const SERVICES = ['Automobile', 'Beauty']

const Navbar = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const isLoggedIn = !!session

  const { cartCount, setSelectedCategory, setSearchText, showLogin, setShowLogin } = useCart()

  const [search, setSearch] = useState('')
  const [showCategories, setShowCategories] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [mobileCat, setMobileCat] = useState<'products' | 'services' | null>(null)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = mobileMenu || showLogin ? 'hidden' : 'auto'
  }, [mobileMenu, showLogin])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-blue-50 border-b">
      {/* ================= DESKTOP NAV ================= */}
      <div className="hidden md:flex items-center justify-between px-6 py-4">
        {/* LOGO */}
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => router.push('/')}>
          Local Legend
        </h1>

        {/* Categories + Search */}
        <div className="flex items-center gap-3">
          <div
            className="relative"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <button className="flex items-center gap-1 bg-blue-100 px-4 py-2 rounded-2xl text-sm">
              Categories <ChevronDown size={16} />
            </button>

            <AnimatePresence>
              {showCategories && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border"
                >
                  <CategoryBlock title="Products" items={PRODUCTS} onSelect={setSelectedCategory} />
                  <CategoryBlock title="Services" items={SERVICES} onSelect={setSelectedCategory} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center bg-white border rounded-2xl px-3 w-[420px]">
            <Search size={18} className="text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setSearchText(search)}
              placeholder="Search products, services..."
              className="w-full h-10 px-2 outline-none text-sm"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Action label="Post" icon={<Mic size={18} />} onClick={() => router.push('/post')} />
          <Action label="Chats" icon={<MessagesSquare size={18} />} onClick={() => router.push('/Chats')} />
          <Action label="Cart" icon={<ShoppingCart size={18} />} count={cartCount} onClick={() => router.push('/Cart')} />

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <div
              onClick={() => (isLoggedIn ? setShowProfileMenu(!showProfileMenu) : setShowLogin(true))}
              className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-2xl cursor-pointer text-sm"
            >
              <UserRound size={18} />
              {session?.user?.name || 'Guest'}
            </div>

            <AnimatePresence>
              {isLoggedIn && showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border"
                >
                  <MenuItem icon={<Store size={16} />} text="Become a Seller" onClick={() => router.push('/seller')} />
                  <MenuItem icon={<LogOut size={16} />} text="Logout" onClick={() => signOut()} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ================= MOBILE NAV ================= */}
      <div className="md:hidden flex items-center justify-between px-4 py-3">
        <Menu onClick={() => setMobileMenu(true)} />
        <h1 className="font-bold">Local Legend</h1>
        <ShoppingCart onClick={() => router.push('/Cart')} />
      </div>

      {/* ================= MOBILE DRAWER (70% WIDTH) ================= */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            <motion.div
              className="fixed inset-0 bg-black z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenu(false)}
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25 }}
              className="fixed top-0 left-0 z-50 h-full w-[70vw] max-w-sm bg-white shadow-xl"
            >
              <div className="flex justify-between items-center px-4 py-3 border-b">
                <h2 className="font-semibold">Menu</h2>
                <X onClick={() => setMobileMenu(false)} />
              </div>

              <div className="p-4 space-y-6">
                {/* Top Actions */}
                <div className="grid grid-cols-3 gap-3">
                  <MobileAction icon={<Mic size={18} />} label="Post" onClick={() => router.push('/post')} />
                  <MobileAction icon={<MessagesSquare size={18} />} label="Chats" onClick={() => router.push('/Chats')} />
                  <MobileAction icon={<ShoppingCart size={18} />} label="Cart" count={cartCount} onClick={() => router.push('/Cart')} />
                </div>

                {/* Categories */}
                <MobileCategory
                  title="Products"
                  open={mobileCat === 'products'}
                  items={PRODUCTS}
                  onToggle={() => setMobileCat(mobileCat === 'products' ? null : 'products')}
                  onSelect={(v) => {
                    setSelectedCategory(v)
                    setMobileMenu(false)
                  }}
                />

                <MobileCategory
                  title="Services"
                  open={mobileCat === 'services'}
                  items={SERVICES}
                  onToggle={() => setMobileCat(mobileCat === 'services' ? null : 'services')}
                  onSelect={(v) => {
                    setSelectedCategory(v)
                    setMobileMenu(false)
                  }}
                />

                {/* Account */}
                <MobileBtn
                  text={isLoggedIn ? 'Become a Seller' : 'Login'}
                  onClick={() => (isLoggedIn ? router.push('/seller') : setShowLogin(true))}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* LOGIN MODAL */}
      <AnimatePresence>
        {showLogin && (
          <motion.div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <LoginComponent />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar

/* ================= COMPONENTS ================= */

type CategoryBlockProps = {
  title: string
  items: string[]
  onSelect: (value: string) => void
}

const CategoryBlock = ({ title, items, onSelect }: CategoryBlockProps) => (
  <div className="p-3 border-b last:border-b-0">
    <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
      {title} <ChevronRight size={14} />
    </h4>
    {items.map((item) => (
      <p
        key={item}
        onClick={() => onSelect(item)}
        className="px-2 py-1 text-sm hover:bg-blue-100 rounded cursor-pointer"
      >
        {item}
      </p>
    ))}
  </div>
)

type ActionProps = {
  icon: React.ReactNode
  label: string
  count?: number
  onClick: () => void
}

const Action = ({ icon, label, count = 0, onClick }: ActionProps) => (
  <div
    onClick={onClick}
    className="relative flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-2xl text-sm cursor-pointer"
  >
    {icon}
    <span>{label}</span>

    {count > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
        {count}
      </span>
    )}
  </div>
)

type MenuItemProps = {
  icon: React.ReactNode
  text: string
  onClick: () => void
}

const MenuItem = ({ icon, text, onClick }: MenuItemProps) => (
  <button
    onClick={onClick}
    className="w-full px-4 py-3 flex items-center gap-2 text-sm hover:bg-blue-100"
  >
    {icon}
    {text}
  </button>
)

type MobileActionProps = {
  icon: React.ReactNode
  label: string
  count?: number
  onClick: () => void
}

const MobileAction = ({ icon, label, count = 0, onClick }: MobileActionProps) => (
  <div
    onClick={onClick}
    className="relative flex flex-col items-center justify-center gap-1 bg-blue-100 py-3 rounded-xl text-xs cursor-pointer"
  >
    {icon}
    <span>{label}</span>
    {count > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
        {count}
      </span>
    )}
  </div>
)

type MobileCategoryProps = {
  title: string
  open: boolean
  items: string[]
  onToggle: () => void
  onSelect: (value: string) => void
}

const MobileCategory = ({ title, open, items, onToggle, onSelect }: MobileCategoryProps) => (
  <div>
    <div onClick={onToggle} className="flex justify-between items-center py-2 cursor-pointer">
      <span className="font-medium">{title}</span>
      <ChevronRight size={16} className={`transition ${open ? 'rotate-90' : ''}`} />
    </div>
    {open &&
      items.map((item) => (
        <p
          key={item}
          onClick={() => onSelect(item)}
          className="pl-4 py-1 text-sm text-gray-600 cursor-pointer hover:text-black"
        >
          {item}
        </p>
      ))}
  </div>
)

type MobileBtnProps = {
  text: string
  onClick: () => void
}

const MobileBtn = ({ text, onClick }: MobileBtnProps) => (
  <button onClick={onClick} className="w-full py-2 bg-blue-100 rounded-xl text-sm font-medium">
    {text}
  </button>
)
