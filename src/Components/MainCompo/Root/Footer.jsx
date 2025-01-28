import { Icon } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
<footer className="bg-gray-800 text-gray-300 py-12">
  <div className="max-w-screen-xl mx-auto px-4">
    {/* Upper Section */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-700 pb-8">
      {/* Logo and Tagline */}
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-bold text-white mb-2">Shaadi.com</h3>
        <p className="text-gray-400">
          Connecting Hearts, Building Futures
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col md:flex-row gap-4">
        <a href="#" className="hover:text-white transition-colors">
          Home
        </a>
        <a href="#" className="hover:text-white transition-colors">
          About Us
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Services
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Success Stories
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Contact Us
        </a>
      </div>
    </div>

    {/* Lower Section */}
    <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
      {/* Social Media Icons */}
      <div className="flex gap-4">
        <a
          href="#"
          className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors"
          aria-label="Facebook"
        >
          <i className="fab fa-facebook-f"></i>
        </a>
        <a
          href="#"
          className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors"
          aria-label="Twitter"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="#"
          className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors"
          aria-label="Instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="#"
          className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors"
          aria-label="LinkedIn"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>

      {/* Copyright */}
      <p className="text-gray-400 text-sm">
        © {new Date().getFullYear()} Shaadi.com Web. All Rights Reserved.
      </p>
    </div>
  </div>
</footer>

  )
}

export default Footer