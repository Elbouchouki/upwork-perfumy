import React from 'react'
import { Navbar as _Navbar, NavbarBrand, NavbarContent, Link, Input } from "@nextui-org/react";
import { GiDelicatePerfume } from "react-icons/gi";
import { usePathname, useRouter } from 'next/navigation';
import { ThemeSwitcher } from './theme-switcher';
import { BsSearch } from 'react-icons/bs'
import { useCustomSearch } from '~/hooks/useCustomSearch';

type NavItem = {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Contact',
    href: '/contact'
  }
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname()
  const { search, genders, page, prices, sort, stores } = useCustomSearch()
  const [searchInput, setInputSearch] = React.useState("")
  const router = useRouter()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      router.push(`?${new URLSearchParams({
        search: searchInput,
        sort: sort,
        genders: genders.filter(f => f.length !== 0).join("|"),
        prices: prices,
        stores: stores.filter(f => f.length !== 0).join("|"),
        page: page.toString()
      }).toString()}`)
      setInputSearch("")
    }
  }
  return (
    <_Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarContent justify='center'>
        {/* <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        /> */}
        <NavbarBrand>
          <Link href='/' className='flex flex-row gap-2 hover:cursor-pointer'>
            <GiDelicatePerfume className='w-6 h-6' />
            <p className="font-bold text-inherit">
              Perfumy
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='gap-4' justify="end">

        <div className=' gap-4 items-center'>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-xl h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<BsSearch size={18} />}
            type="search"
            value={searchInput}
            onChange={(e) => setInputSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {/* {
            navItems.map((item, index) => (
              <NavbarItem
                isActive={pathname === item.href}
                key={`${item}-${index}`}>
                <Link href={item.href}
                  className={cn("text-foreground-500", {
                    'text-primary-500': pathname === item.href
                  })}
                >
                  {item.name}
                </Link>
              </NavbarItem>
            ))
          } */}
        </div>
        <ThemeSwitcher />
      </NavbarContent >
      {/* <NavbarContent justify="end">
        
      </NavbarContent> */}
      {/* <NavbarMenu className='bg-stone-100 dark:bg-stone-900' >
        {navItems.map((item, index) => (
          <NavbarMenuItem key={`collased-${item}-${index}`}>
            <Link
              color={pathname === item.href ? 'primary' : 'foreground'}
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu> */}
    </_Navbar>
  )
}

export default Navbar