import React from 'react'

import { Card, CardHeader, CardBody, Image, CardFooter, Button, Skeleton } from "@nextui-org/react";
import { cn } from '~/utils';
import { Perfum } from '@prisma/client';
import { BiSolidStore } from 'react-icons/bi'
import Link from 'next/link';

type ProductCardSkeletonProps = {
  className?: string
}

const ProductCardSkeleton = ({ className }: ProductCardSkeletonProps) => {
  return (
    <Card
      className={cn("py-4 border-transparent transition-colors   bg-inherit h-full", className)}>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Skeleton>
          <h4 className="font-bold text-medium ">BLABLABLABLA</h4>
        </Skeleton>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex justify-center items-center my-2">
        <Skeleton>
          <div className='h-80 w-72'></div>
        </Skeleton>
      </CardBody>
      <CardFooter className='flex flex-col gap-2 items-start '>
        <Skeleton>
          <p className="text-lg uppercase font-bold text-primary-500">$1234</p>
        </Skeleton>
        <Skeleton>
          <div className="text-default-500 flex flex-row items-center gap-1">
            blabla
          </div>
        </Skeleton>
      </CardFooter>
    </Card>
  )
}

export default ProductCardSkeleton