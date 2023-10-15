import Link from 'next/link'
import React from 'react'
import { GiDelicatePerfume } from 'react-icons/gi'

const Logo = () => {
  return (
    <Link href='/' className='flex flex-row gap-2 hover:cursor-pointer'>
      <GiDelicatePerfume className='w-9 h-9 text-primary-500' />
      <div className='flex flex-col'>
        <p className="font-bold text-primary-500">
          Perfumy
        </p>
        <p className="text-xs text-default-500">
          Australia's Perfumes Search Engine
        </p>
      </div>
    </Link>
  )
}

export default Logo