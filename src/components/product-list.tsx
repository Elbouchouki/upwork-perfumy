import { Button, Checkbox, CheckboxGroup, Input, Radio, RadioGroup, ScrollShadow, Select, SelectItem, Skeleton } from '@nextui-org/react';
import React from 'react'
import { api } from '~/utils/api';
import { Accordion, AccordionItem } from "@nextui-org/react";
import { PRICE_RANGE } from '~/utils/constants';
import { useRouter } from 'next/navigation';
import ProductCard from './product-card';

import { AiOutlineSortDescending, AiOutlineSortAscending } from 'react-icons/ai'
import { BsChevronLeft, BsChevronRight, BsSearch } from 'react-icons/bs'
import ProductCardSkeleton from './product-card-skeleton';
import { useCustomSearch } from '~/hooks/useCustomSearch';
import { MdLayersClear } from 'react-icons/md'
import { Perfum } from '@prisma/client';


type PaginationProps = {
  page: number
  pageTotal: number
  perfumsIsLoading?: boolean
  perfums?: Perfum[]
  handleStateChange: (data: {
    _prices?: string
    _genders?: string[]
    _stores?: string[]
    _sort?: string
    _page?: number
    _search?: string

  }) => void
}

const Pagination = ({ handleStateChange, page, pageTotal, perfumsIsLoading, perfums }: PaginationProps) => {
  return (
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
        <Skeleton isLoaded={!perfumsIsLoading} disableAnimation >
          {
            perfums?.length !== 0 && (
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
        disabled={page === pageTotal || pageTotal === 0}
        className='disabled:hidden'
        onPress={() => handleStateChange({ _page: page + 1 })}
      >
        Next
      </Button>
    </div>
  )
}


const ProductList = () => {

  const router = useRouter()

  const { genders, page, prices, sort, stores, search } = useCustomSearch()

  const itemsPerPage = 24
  const totalItems = api.perfum.countPefums.useQuery({
    sort: sort === "ASC" ? "asc" : sort === "DESC" ? "desc" : undefined,
    gender: genders,
    price: [prices],
    store: stores,
    search: search
  })
  const [searchInput, setInputSearch] = React.useState("")

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setInputSearch("")
      router.push(`?${new URLSearchParams({
        search: searchInput,
        sort: sort,
        genders: genders.filter(f => f.length !== 0).join("|"),
        prices: prices,
        stores: stores.filter(f => f.length !== 0).join("|"),
        page: page.toString()
      }).toString()}`)
    }
  }

  const pageTotal = totalItems?.data ? Math.ceil(totalItems?.data / itemsPerPage) : 0
  const perfums = api.perfum.getAll.useQuery({
    page,
    itemsPerPage,
    sort: sort === "ASC" ? "asc" : sort === "DESC" ? "desc" : undefined,
    gender: genders,
    price: [prices],
    store: stores,
    search: search
  });
  const storesList = api.perfum.getStores.useQuery();

  const handleStateChange = ({
    _prices, _genders, _stores, _sort, _page, _search
  }: {
    _prices?: string
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

    let so = ""
    if (_sort === undefined) {
      so = sort
    } else {
      so = _sort
    }

    const searchParams = new URLSearchParams({
      search: s,
      sort: so,
      genders: (_genders ?? genders).filter(f => f.length !== 0).join("|"),
      prices: (_prices ?? prices) || "",
      stores: (_stores ?? stores).filter(f => f.length !== 0).join("|"),
      page: p.toString(),
    })
    router.push(`?${searchParams.toString()}`)
  }

  const clearableFilters = () => {
    return prices !== "" ||
      genders.filter(f => f.length !== 0).length !== 0 ||
      stores.filter(f => f.length !== 0).length !== 0
  }
  console.log(clearableFilters())

  return (
    <div className='flex flex-col md:flex-row py-4 px-4 sm:gap-3 w-full'>
      <div className='md:w-60 flex-none' >

        <Accordion selectionMode="single" variant='light'>
          <AccordionItem key="1" aria-label="Price" subtitle="Price" >
            <RadioGroup
              value={prices}
              onValueChange={(s: string) => handleStateChange({ _prices: s })}
              className='mx-2 mb-3'
            >
              {
                PRICE_RANGE.map(priceRange => (
                  <Radio value={priceRange.id} key={priceRange.id}>
                    {`${priceRange.min ? "$" + priceRange.min : "Under"} ${!(priceRange.min && priceRange.max) ? " " : " - "} ${priceRange.max ? "$" + priceRange.max : "and Above"}`}
                  </Radio >
                ))
              }
            </RadioGroup>
          </AccordionItem>
          <AccordionItem key="2" aria-label="Gender" subtitle="Gender">
            <CheckboxGroup
              value={genders}
              onValueChange={(s: string[]) => handleStateChange({ _genders: s })}
              className='mx-2 mb-3'
            >
              <Checkbox value="MAN">Men</Checkbox>
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
        <div className='flex flex-col sm:flex-row justify-center gap-2 items-end' >

          <div className='w-full flex flex-col gap-2'>
            <Input
              classNames={{
                base: "sm:max-w-xs h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 ",
              }}
              placeholder="Type to search..."
              size="sm"
              variant='underlined'
              startContent={<BsSearch size={18} />}
              type="search"
              value={searchInput}
              onChange={(e) => setInputSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Select
              size='sm'
              placeholder='Sort by'
              variant='underlined'
              radius='none'
              startContent={sort === "ASC" ? <AiOutlineSortAscending /> : <AiOutlineSortDescending />}
              className="sm:max-w-xs"
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
          </div>
          <Pagination page={page} pageTotal={pageTotal} perfums={perfums.data} perfumsIsLoading={perfums.isLoading} handleStateChange={handleStateChange} />
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
        {
          clearableFilters() &&
          <div>
            <Button
              variant='light'
              size='sm'
              startContent={<MdLayersClear />}
              onPress={() => handleStateChange({
                _search: search,
                _genders: [],
                _prices: "",
                _sort: "",
                _stores: []
              })}
            >
              clear filters
            </Button>
          </div>
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

        <div className='flex justify-end'>
          <Pagination page={page} pageTotal={pageTotal} perfums={perfums.data} perfumsIsLoading={perfums.isLoading} handleStateChange={handleStateChange} />
        </div>


      </div>
    </div >
  )
}

export default ProductList