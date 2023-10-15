import Link from 'next/link'
import React from 'react'
import { FaDiscord, FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='mt-auto w-full  mx-auto p-4 md:py-8 flex flex-col justify-center items-center gap-5'>
      {/* <div className="sm:flex sm:items-center sm:justify-between w-full"> */}
      {/* <Logo /> */}
      {/* <ul className="flex flex-wrap gap-5 items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 justify-end">

          {
            navItems.map((item, index) => (
              <li key={`${item}-${index}`}>
                <Link href={item.href}
                  className="hover:underline ">
                  {item.name}
                </Link>
              </li>
            ))
          }
       
        </ul> */}
      {/* </div> */}
      {/* sm:flex sm:items-center sm:justify-between sm:flex-row */}

      <div className=" w-full justify-center items-center flex flex-col gap-4">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()} <Link href="/" className='hover:underline hover:text-primary-500'>Perfumy™</Link>. All Rights Reserved.
        </span>
        <div className="flex  space-x-5 sm:justify-center ">
          <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <FaFacebook className='w-4 h-4' />
            <span className="sr-only">Facebook page</span>
          </Link>
          <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <FaDiscord className='w-4 h-4' />
            <span className="sr-only">Discord community</span>
          </Link>
          <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <FaTwitter className='w-4 h-4' />
            <span className="sr-only">Twitter page</span>
          </Link>
          <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <FaGithub className='w-4 h-4' />
            <span className="sr-only">GitHub account</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer