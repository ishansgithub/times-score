'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="text-xl font-light text-gray-100 hover:text-gray-300 transition-colors"
          >
            Cricket Hub
          </Link>
          
          <div className="flex space-x-8">
            <Link
              href="/cricket-score"
              className={`text-sm font-light transition-colors ${
                pathname === '/cricket-score' 
                  ? 'text-white border-b-2 border-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              All Matches
            </Link>
            
            <Link
              href="/live-matches"
              className={`text-sm font-light transition-colors ${
                pathname === '/live-matches' 
                  ? 'text-white border-b-2 border-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Live Matches
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar