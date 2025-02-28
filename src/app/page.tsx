'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function Page() {

  const router = useRouter();
  useEffect(() => { 
    const user = localStorage.getItem('athlete')
    if (!user) {
      // Redirect to login page
      router.push('/landing')
    }
    else{
      // Redirect to home page
      router.push('/athlete/home')
    }
  }, [])

  return (
    <div>page</div>
  )
}

export default Page