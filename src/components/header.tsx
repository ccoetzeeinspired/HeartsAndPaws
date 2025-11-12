'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sanctuary-neutral-200">
        <div className="sanctuary-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-sanctuary-primary-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl text-sanctuary-primary-600">
                  Paws & Hearts
                </h1>
                <p className="text-xs text-sanctuary-neutral-500 -mt-1">Animal Sanctuary</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/animals"
                className="text-sanctuary-neutral-700 hover:text-sanctuary-primary-600 font-medium transition-colors"
              >
                Find a Pet
              </Link>
              <Link
                href="/about"
                className="text-sanctuary-neutral-700 hover:text-sanctuary-primary-600 font-medium transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/volunteer"
                className="text-sanctuary-neutral-700 hover:text-sanctuary-primary-600 font-medium transition-colors"
              >
                Volunteer
              </Link>
              <Link
                href="/donate"
                className="text-sanctuary-neutral-700 hover:text-sanctuary-primary-600 font-medium transition-colors"
              >
                Donate
              </Link>
              <Link
                href="/events"
                className="text-sanctuary-neutral-700 hover:text-sanctuary-primary-600 font-medium transition-colors"
              >
                Events
              </Link>
              <Link
                href="/contact"
                className="text-sanctuary-neutral-700 hover:text-sanctuary-primary-600 font-medium transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/login"
                className="sanctuary-button-primary text-sm"
              >
                Staff Portal
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-sanctuary-neutral-100 hover:bg-sanctuary-neutral-200 transition-colors"
              data-testid="mobile-menu-button"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            data-testid="mobile-menu-backdrop"
          />

          {/* Menu Drawer */}
          <div
            className="fixed top-0 right-0 bottom-0 w-64 bg-white z-50 shadow-xl md:hidden"
            data-testid="mobile-menu-drawer"
          >
            <div className="p-4">
              {/* Close button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                  data-testid="mobile-menu-close"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/animals"
                  className="text-sanctuary-neutral-700 hover:text-sanctuary-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-sanctuary-primary-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="mobile-nav-animals"
                >
                  Find a Pet
                </Link>
                <Link
                  href="/about"
                  className="text-sanctuary-neutral-700 hover:text-sanctuary-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-sanctuary-primary-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="mobile-nav-about"
                >
                  About Us
                </Link>
                <Link
                  href="/volunteer"
                  className="text-sanctuary-neutral-700 hover:text-sanctuary-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-sanctuary-primary-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="mobile-nav-volunteer"
                >
                  Volunteer
                </Link>
                <Link
                  href="/donate"
                  className="text-sanctuary-neutral-700 hover:text-sanctuary-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-sanctuary-primary-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="mobile-nav-donate"
                >
                  Donate
                </Link>
                <Link
                  href="/events"
                  className="text-sanctuary-neutral-700 hover:text-sanctuary-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-sanctuary-primary-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="mobile-nav-events"
                >
                  Events
                </Link>
                <Link
                  href="/contact"
                  className="text-sanctuary-neutral-700 hover:text-sanctuary-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-sanctuary-primary-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="mobile-nav-contact"
                >
                  Contact
                </Link>
                <Link
                  href="/login"
                  className="sanctuary-button-primary text-center"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="mobile-nav-staff"
                >
                  Staff Portal
                </Link>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
