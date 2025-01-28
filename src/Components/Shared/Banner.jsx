import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import banner1 from '../../assets/Banner/banner-11.avif'
import banner2 from '../../assets/Banner/banner-12.avif'
import banner3 from '../../assets/Banner/banner-13.avif'
import banner4 from '../../assets/Banner/coupleHd.jpg'
import banner5 from '../../assets/Banner/cover-5.jpg'
import banner6 from '../../assets/Banner/cover-6.avif'
import banner7 from '../../assets/Banner/banner-14.avif'
import banner8 from '../../assets/Banner/banner-15.avif'

const Banner = () => {
  return (
    <div className='bg-cover my-10'>
<Carousel className="h-full bg-cover relative">
  <div className="relative">
    <img src={banner1} className="w-full h-full object-cover" />
    <p className="absolute bottom-5 left-5 text-lg md:text-2xl lg:text-3xl text-white bg-gradient-to-r from-black/70 to-black/30 px-4  py-2 rounded-md shadow-md">
      Welcome to Our Journey...
    </p>
  </div>

  <div className="relative">
    <img src={banner8} className="w-full h-full object-cover" />
    <p className="absolute bottom-5 left-5 text-lg md:text-2xl lg:text-3xl text-white bg-gradient-to-r from-black/70 to-black/30 px-4 py-2 rounded-md shadow-md">
      Make Your Life Better...
    </p>
  </div>

  <div className="relative">
    <img src={banner2} className="w-full h-full object-cover" />
    <p className="absolute bottom-5 left-5 text-lg md:text-2xl lg:text-3xl text-white bg-gradient-to-r from-black/70 to-black/30 px-4 py-2 rounded-md shadow-md">
      Explore Endless Possibilities...
    </p>
  </div>

  <div className="relative">
    <img src={banner7} className="w-full h-full object-cover" />
    <p className="absolute bottom-5 left-5 text-lg md:text-2xl lg:text-3xl text-white bg-gradient-to-r from-black/70 to-black/30 px-4 py-2 rounded-md shadow-md">
      Your Next Adventure Awaits...
    </p>
  </div>

  <div className="relative">
    <img src={banner3} className="w-full h-full object-cover" />
    <p className="absolute bottom-5 left-5 text-lg md:text-2xl lg:text-3xl text-white bg-gradient-to-r from-black/70 to-black/30 px-4 py-2 rounded-md shadow-md">
      Inspiring Dreams...
    </p>
  </div>

  <div className="relative">
    <img src={banner4} className="w-full h-full object-cover" />
    <p className="absolute bottom-5 left-5 text-lg md:text-2xl lg:text-3xl text-white bg-gradient-to-r from-black/70 to-black/30 px-4 py-2 rounded-md shadow-md">
      Find Your Passion...
    </p>
  </div>

  <div className="relative">
    <img src={banner5} className="w-full h-full object-cover" />
    <p className="absolute bottom-5 left-5 text-lg md:text-2xl lg:text-3xl text-white bg-gradient-to-r from-black/70 to-black/30 px-4 py-2 rounded-md shadow-md">
      Discover New Horizons...
    </p>
  </div>

  <div className="relative">
    <img src={banner6} className="w-full h-full object-cover" />
    <p className="absolute bottom-5 left-5 text-lg md:text-2xl lg:text-3xl text-white bg-gradient-to-r from-black/70 to-black/30 px-4 py-2 rounded-md shadow-md">
      Empowering Moments...
    </p>
  </div>
</Carousel>

    </div>
  )
}

export default Banner