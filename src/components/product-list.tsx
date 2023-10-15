import { Button, Checkbox, CheckboxGroup, ScrollShadow, Select, SelectItem, Skeleton } from '@nextui-org/react';
import React from 'react'
import { api } from '~/utils/api';
import { Accordion, AccordionItem } from "@nextui-org/react";
import { PRICE_RANGE } from '~/utils/constants';
import { useRouter } from 'next/navigation';
import ProductCard from './product-card';

import { AiOutlineSortDescending, AiOutlineSortAscending } from 'react-icons/ai'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import ProductCardSkeleton from './product-card-skeleton';
import { useCustomSearch } from '~/hooks/useCustomSearch';
import { MdLayersClear } from 'react-icons/md'
const ProductList = () => {

  const router = useRouter()

  const { genders, page, prices, sort, stores, search } = useCustomSearch()

  const itemsPerPage = 24
  const totalItems = api.perfum.countPefums.useQuery({
    sort: sort === "ASC" ? "asc" : sort === "DESC" ? "desc" : undefined,
    gender: genders,
    price: prices,
    store: stores,
    search: search
  })

  const pageTotal = totalItems?.data ? Math.ceil(totalItems?.data / itemsPerPage) : 0
  const perfums = api.perfum.getAll.useQuery({
    page,
    itemsPerPage,
    sort: sort === "ASC" ? "asc" : sort === "DESC" ? "desc" : undefined,
    gender: genders,
    price: prices,
    store: stores,
    search: search
  });
  const storesList = api.perfum.getStores.useQuery();

  const handleStateChange = ({
    _prices, _genders, _stores, _sort, _page, _search
  }: {
    _prices?: string[]
    _genders?: string[]
    _stores?: string[]
    _sort?: string
    _page?: number
    _search?: string

  }) => {
    let p = _page ?? page
    if (_prices ?? _genders ?? _stores ?? _sort) {
      p = 1
    }

    let s = ""
    if (_search === undefined) {
      s = search
    } else {
      s = _search
    }

    const searchParams = new URLSearchParams({
      search: s,
      sort: (_sort ?? sort),
      genders: (_genders ?? genders).filter(f => f.length !== 0).join("|"),
      prices: (_prices ?? prices).filter(f => f.length !== 0).join("|"),
      stores: (_stores ?? stores).filter(f => f.length !== 0).join("|"),
      page: p.toString(),
    })
    router.push(`?${searchParams.toString()}`)
  }

  return (
    <div className='flex flex-col md:flex-row py-4 px-4 sm:gap-3 w-full'>
      <div className='md:w-60 flex-none' >

        <Accordion selectionMode="single" variant='light'>
          <AccordionItem key="1" aria-label="Price" subtitle="Price" >
            <CheckboxGroup
              value={prices}
              onValueChange={(s: string[]) => handleStateChange({ _prices: s })}
              className='mx-2 mb-3'
            >
              {
                PRICE_RANGE.map(priceRange => (
                  <Checkbox value={priceRange.id} key={priceRange.id}>
                    {`${priceRange.min ? priceRange.min + " AUD" : "Under"} - ${priceRange.max ? priceRange.max + " AUD" : "Above"}`}
                  </Checkbox>
                ))
              }
            </CheckboxGroup>
          </AccordionItem>
          <AccordionItem key="2" aria-label="Gender" subtitle="Gender">
            <CheckboxGroup
              value={genders}
              onValueChange={(s: string[]) => handleStateChange({ _genders: s })}
              className='mx-2 mb-3'
            >
              <Checkbox value="MAN">Man</Checkbox>
              <Checkbox value="WOMEN">Women</Checkbox>
            </CheckboxGroup>
          </AccordionItem>
          <AccordionItem key="3" aria-label="Store" subtitle="Store">
            <ScrollShadow className="h-96">
              <Skeleton isLoaded={!storesList?.isLoading} >
                <CheckboxGroup
                  value={stores}
                  onValueChange={(s: string[]) => handleStateChange({ _stores: s })}
                  className='mx-2 mb-3'
                >
                  {
                    storesList?.data?.map((store, index) => (
                      <Checkbox value={store.store} key={index}>
                        {store.store}
                      </Checkbox>
                    ))
                  }
                </CheckboxGroup>
              </Skeleton>

            </ScrollShadow>
          </AccordionItem>
        </Accordion>
      </div>
      <div className='flex flex-col gap-5 w-full'>
        <div className='flex flex-col sm:flex-row justify-center gap-2 ' >
          <Select
            size='sm'
            placeholder='Sort by'
            variant='underlined'
            radius='none'
            startContent={sort === "ASC" ? <AiOutlineSortAscending /> : <AiOutlineSortDescending />}
            className="max-w-xs"
            value={sort}
            onChange={(e) => handleStateChange({ _sort: e.target.value })}
            onSelectionChange={(e) => console.log(e)}

          >
            <SelectItem key="ASC" value="ASC">
              Price: Low to High
            </SelectItem>
            <SelectItem key="DESC" value="DESC">
              Price: High to Low
            </SelectItem>
          </Select>
          <div className="ml-auto flex gap-2 items-center">
            <Button
              startContent={<BsChevronLeft />}
              size="sm"
              variant="light"
              color="primary"
              className='disabled:hidden'
              disabled={page === 1}
              onPress={() => handleStateChange({ _page: page - 1 })}
            >
              Previous
            </Button>
            {
              <Skeleton isLoaded={!perfums?.isLoading} disableAnimation >
                {
                  perfums?.data?.length !== 0 && (
                    <p className='text-sm whitespace-nowrap '>
                      {`${page} of ${pageTotal}`}
                    </p>
                  )
                }
              </Skeleton>
            }
            <Button
              endContent={<BsChevronRight />}
              size="sm"
              variant="light"
              color="primary"
              disabled={page === pageTotal}
              className='disabled:hidden'
              onPress={() => handleStateChange({ _page: page + 1 })}
            >
              Next
            </Button>
          </div>
        </div>
        {
          search.length !== 0 && (
            <div className='text-sm text-primary-500 flex flex-row items-center gap-1'>
              <p className='ml-2'>{`Results of search "${search}"`}</p>
              <Button
                variant='light'
                size='sm'
                startContent={<MdLayersClear />}
                onPress={() => handleStateChange({ _search: "" })}
              >
                clear search
              </Button>
            </div>
          )
        }
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 md:gap-4 w-full'>
          {
            perfums?.isLoading ? (
              Array.from({ length: itemsPerPage }).map((_, index) => (<ProductCardSkeleton key={index} />))
            ) :
              (!perfums?.data || perfums?.data?.length > 0) ? perfums?.data?.map((perfum, index) => (
                <ProductCard perfum={perfum} key={perfum.id} />
              )) : <div className="flex flex-col  col-span-4 items-center my-5">
                <p className='font-semibold text-lg'>No results found</p>
                <p className='text-sm text-default-500'>Please try to change your search or filters</p>
              </div>
          }
        </div>
      </div>
    </div >
  )
}

export default ProductList