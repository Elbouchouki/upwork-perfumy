import React from 'react'

import { Card, CardHeader, CardBody, Image, CardFooter } from "@nextui-org/react";
import { cn } from '~/utils';
import { Perfum } from '@prisma/client';
import { BiSolidStore } from 'react-icons/bi'
import Link from 'next/link';

type ProductCardProps = {
  className?: string
  perfum: Perfum
}

const ProductCard = ({ perfum, className }: ProductCardProps) => {
  return (
    <Link href={perfum.handle} target='_blank' >
      <Card
        className={cn("py-4 border-transparent transition-colors  hover:cursor-pointer group bg-inherit h-full", className)}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-medium ">{perfum.title}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2 flex justify-center items-center my-2">
          <Image
            alt={`Image of ${perfum.title}`}
            className="object-cover h-60 w-full rounded-xl group-hover:scale-105"
            src={perfum.image}
          // width={300}
          // height={300}
          />
        </CardBody>
        <CardFooter className='flex flex-col gap-2 items-start '>
          <p className="text-lg uppercase font-bold text-primary-500">${(+perfum.price).toFixed(2)}</p>
          <div className="text-default-500 flex flex-row items-center gap-1">
            <BiSolidStore />
            <span>{perfum.store}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ProductCard