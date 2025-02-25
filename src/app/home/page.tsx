'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function Page() {
    const router = useRouter()
    useEffect(() => {
        router.push('/')
    }, [])
  return (
    <div>Home</div>
  )
}

export default Page