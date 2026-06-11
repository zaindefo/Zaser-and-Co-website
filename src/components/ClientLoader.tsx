'use client'
import { useEffect, useState } from 'react'
import { Loader } from '@/components/Loader'

export function ClientLoader() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('zaserLoaded')) {
      setShow(true)
    }
  }, [])

  if (!show) return null
  return <Loader onComplete={() => setShow(false)} />
}
