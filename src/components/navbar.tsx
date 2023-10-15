import React from 'react'
import { Navbar as _Navbar, NavbarBrand, NavbarContent, Link, Input, NavbarMenu, NavbarMenuItem, NavbarItem, NavbarMenuToggle } from "@nextui-org/react";
import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from './theme-switcher';
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

      <NavbarContent className='gap-4' justify="center">
        <div className=' flex-row gap-4 items-center hidden sm:flex'>
          {
            navItems.map((item, index) => (
              <NavbarItem
                isActive={pathname === item.href}
                key={`${item.name}-${index}`}>
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

        </div>
      </NavbarContent>
      <NavbarContent className='gap-4' justify="end">
        <ThemeSwitcher />
      </NavbarContent >
      <NavbarMenu className='bg-stone-100 dark:bg-stone-900' >
        {navItems.map((item, index) => (
          <NavbarMenuItem key={`collased-${item.name}-${index}`}>
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