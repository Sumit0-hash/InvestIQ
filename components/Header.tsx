import React from 'react'
import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/navItems";
import UserDropdown from "@/components/userDropdown";

const Header = () => {
    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href="/">
                    <Image src="/assets/icons/logo.svg" alt="InvestIQ logo" width={140} height={32} className="h-8 w-auto cursor-pointer"></Image>
                </Link>
                <nav className="hidden sm:block">
                    <NavItems/>
                </nav>
                <UserDropdown/>
            </div>
        </header>
    )
}
export default Header
