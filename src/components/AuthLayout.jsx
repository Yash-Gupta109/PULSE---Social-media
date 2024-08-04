// this is actually a mechanism like how we will protect pages and routs

import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
// so that we can redirect user to other pages
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication=true}) {
    const navigate =useNavigate()
    const [loader, setLoader] =useState(true)
    const authStatus = useSelector(state => state.auth.status)
    useEffect(() =>{
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }
        else if(!authentication && authStatus!== authentication){
            navigate('/')
        }
        setLoader(false)
    },[authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}
