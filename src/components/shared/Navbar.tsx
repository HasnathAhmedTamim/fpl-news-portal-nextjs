'use client'
import Link from "next/link"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu"
import { Switch } from "../ui/switch"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"
import MobileMenu from "./MobileMenu"





const Navbar = () => {
    const pathname = usePathname();

    return (
        <header className="py-4  shadow-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* logo */}
                <div className="text-2xl font-bold hover:text-red-700">
                    <Link href="/">FPL News </Link>
                </div>
                {/* desktop links */}
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList >
                        <NavigationMenuItem className="flex items-center space-x-8">

                            <Link href="/news" className={` ${pathname === "/news" ? "text-red-700 font-semibold" : "text-gray-800 "} hover:text-red-700`}>FPL News</Link>

                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className={` ${pathname === "/fplservices" ? "text-red-700 font-semibold" : "text-gray-800 "} hover:text-red-700`}>FPL Service</NavigationMenuTrigger>
                            <NavigationMenuContent >
                                <div >
                                    <ul className="text-gray-800 rounded-md shadow-md px-4  space-y-2">
                                        <li><Link href="/fplservices/link1" >Link1</Link></li>
                                        <li><Link href="/fplservices/link2">Link2</Link></li>
                                        <li><Link href="/fplservices/link3" >Link3</Link></li>
                                    </ul>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="flex items-center space-x-8">

                            <Link href="/aboutfpl" className={` ${pathname === "/aboutfpl" ? "text-red-700 font-semibold" : "text-gray-800 "} hover:text-red-700`}>About FPL</Link>

                            <Link href="/contactfpl" className={` ${pathname === "/contactfpl" ? "text-red-700 font-semibold" : "text-gray-800 "} hover:text-red-700`}>Contact FPL</Link>

                        </NavigationMenuItem>



                    </NavigationMenuList>

                </NavigationMenu>

                {/* color mode toggle and login button*/}
                <div className="hidden lg:flex items-center space-x-4">
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-800  mr-2"> Color Mode</span>
                        <Switch />

                        <Button variant="default">Login</Button>

                    </div>
                </div>

                {/* mobile menu */}

                <MobileMenu></MobileMenu>

            </nav>
        </header>
    )
}

export default Navbar