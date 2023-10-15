import React from 'react'
import { Navbar as _Navbar, NavbarBrand, NavbarContent, Link, Input, NavbarMenu, NavbarMenuItem, NavbarItem, NavbarMenuToggle } from "@nextui-org/react";
import { GiDelicatePerfume } from "react-icons/gi";
import { usePathname, useRouter } from 'next/navigation';
import { ThemeSwitcher } from './theme-switcher';
import { BsSearch } from 'react-icons/bs'
import { useCustomSearch } from '~/hooks/useCustomSearch';
import { cn } from '~/utils';
import Logo from './Logo';

type NavItem = {
  name: string;
  href: string;
}

export const navItems: NavItem[] = [
  {
    name: 'Contact',
    href: '/contact'
  }, {
    name: 'About',
    href: '/about'
  }
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname()
  const { genders, page, prices, sort, stores } = useCustomSearch()
  const [searchInput, setInputSearch] = React.useState("")
  const router = useRouter()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsMenuOpen(false)
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
  return (
    <_Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} isBordered maxWidth="full">
      <NavbarContent justify='start' >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='gap-4' justify="end">
        <div className=' flex-row gap-4 items-center hidden sm:flex'>

          {
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
          }
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
        </div>
        <ThemeSwitcher />
      </NavbarContent >
      <NavbarMenu className='bg-stone-100 dark:bg-stone-900' >
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
      </NavbarMenu>
    </_Navbar>
  )
}

export default Navbar