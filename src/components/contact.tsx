import React from 'react'
import ContactForm from './contact-form'
import Link from 'next/link'

const Contact = () => {
  return (
    <div>

      <div className="flex flex-col items-center h-full gap-5 px-3 mt-10">
        <h3 className="w-full text-sm md:max-w-lg text-muted-foreground">
          <span className='text-justify'>
            You can contact us via the form below, or you can <Link href="mailto:info@perfumy.com.au" className='font-semibold'>send us an email</Link>. We will get back to you as soon as possible.
          </span>
        </h3>
        <div className="w-full md:max-w-lg">
          <ContactForm />
        </div>
        <div className="w-full text-xs md:max-w-lg text-muted-foreground">
          If you prefer to call us, you can reach us on <Link href="tel:+614 8888 8888" className='font-semibold'>+614 8888 8888</Link>.
        </div>
      </div>
    </div>
  )
}

export default Contact