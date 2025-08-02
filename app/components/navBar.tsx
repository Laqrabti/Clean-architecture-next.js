"use client"

// components/Navbar.tsx
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'New Arrivals', href: '/new' },
    { name: 'Deals', href: '/deals' },
    { name: 'Collections', href: '/collections' },
  ];

  const categoryLinks = [
    { name: 'Electronics', href: '/electronics' },
    { name: 'Fashion', href: '/fashion' },
    { name: 'Home & Kitchen', href: '/home' },
    { name: 'Beauty', href: '/beauty' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left Section - Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-8 h-8 rounded-lg"></div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">ShopZen</span>
            </Link>
            
            {/* Desktop Category Menu */}
            <div className="hidden lg:ml-10 lg:flex lg:space-x-6">
              {categoryLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white transition-colors duration-200 font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Center Section - Search (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-10">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-1.5 rounded-md hover:bg-indigo-700"
                title="Search"
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Section - Icons */}
          <div className="flex items-center">
            {/* Mobile Search Button */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Account */}
            <Link href="/account" className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>

            {/* Cart */}
            <div className="relative">
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden ml-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="lg:hidden p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-1.5 rounded-md hover:bg-indigo-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="px-2 pt-2 pb-4 border-t border-gray-200 dark:border-gray-800">
            <h3 className="px-3 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Categories</h3>
            <div className="mt-2 space-y-1">
              {categoryLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Secondary Navigation */}
      <div className="hidden lg:block bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="py-3 text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;