
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Root = () => {
  return (
    <div className='w-full max-w-6xl mx-auto '>
      <Navbar></Navbar>
      <div className=''>
      <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Root