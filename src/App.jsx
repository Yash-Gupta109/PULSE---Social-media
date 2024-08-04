import React, { useState, useEffect } from 'react'
// dispatch is a merger whenever we need to use redux with the react
import {useDispatch} from 'react-redux'
// import './App.css'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {Outlet} from 'react-router-dom'

function App() {
  // always remember env files are always need to close the app and then restart in terminal
  // for taking the access of env file we need to do process.env but that is not required that every time take accesss like this only 
  // because we are using vite so we will need to do it like this 
  // console.log(import.meta.env.VITE_APPWRITE_URL);

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData})) 
      }
      else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-[#fcfafa]'>
      <div className='w-full block'>
        <Header/>
        <main>
        {/* Todo:*/}
        <Outlet/> 
        </main>
        <Footer/>
      </div>
    </div>
  ) : (null)
}

export default App
