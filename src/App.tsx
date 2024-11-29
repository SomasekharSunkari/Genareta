
import './App.css'
import Footer from './Components/Footer'
import BuyCredit from './pages/BuyCredit.jsx'
import Home from './pages/Home'
import Navbar from './Components/Navbar'
import Result from './pages/Result'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { useContext } from 'react'
import { AppContext } from './Components/Context'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const context = useContext(AppContext);
  if (!context) {
    return "Loading ..."
  }

  return (
    <div className=' px-4 sm:px-10 md:px-14 lg:px-28 bg-gradient-to-b from-teal-50 to-orange-50 min-h-screen overflow-x-hidden'>
      <ToastContainer position='bottom-right' />

      <Navbar />
      {context.showLogin &&
        <Login />
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy' element={<BuyCredit />} />

      </Routes>
      <Footer />

    </div>
  )
}

export default App
