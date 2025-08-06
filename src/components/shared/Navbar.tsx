'use client'
import Link from "next/link"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu"
import { Switch } from "../ui/switch"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"
import MobileMenu from "./MobileMenu"
import { useContext } from "react"
import { ThemeContext } from "@/app/context/themeContext"





const Navbar = () => {
    const pathname = usePathname();
    const themeContext = useContext(ThemeContext);
    
    if (!themeContext) {
        throw new Error('Navbar must be used within a ThemeProvider');
    }
    
    const { isDarkMode, toggleTheme } = themeContext;

    return (
        <header className={`py-4 shadow-md transition-colors duration-200 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* logo */}
                <div className={`text-2xl font-bold hover:text-red-700 transition-colors duration-200 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    <Link href="/">FPL News </Link>
                </div>
                {/* desktop links */}
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList >
                        <NavigationMenuItem className="flex items-center space-x-8">

                            <Link href="/news" className={`transition-colors duration-200 ${pathname === "/news" ? "text-red-700 font-semibold" : isDarkMode ? "text-white" : "text-gray-800"} hover:text-red-700`}>FPL News</Link>

                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className={`transition-colors duration-200 ${pathname === "/fplservices" ? "text-red-700 font-semibold" : isDarkMode ? "text-white bg-gray-800" : "text-gray-800 bg-white"} hover:text-red-700`}>FPL Services</NavigationMenuTrigger>
                            <NavigationMenuContent >
                                <div >
                                    <ul className={`rounded-md shadow-md px-4 py-2 space-y-2 ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"}`}>
                                        <li><Link href="/fplservices" className={`block px-2 py-1 rounded hover:text-red-700 transition-colors duration-200 ${isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"}`}>All Services</Link></li>
                                        <li><Link href="/fplservices/calculator" className={`block px-2 py-1 rounded hover:text-red-700 transition-colors duration-200 ${isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"}`}>Points Calculator</Link></li>
                                        <li><Link href="/fplservices/player-analysis" className={`block px-2 py-1 rounded hover:text-red-700 transition-colors duration-200 ${isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"}`}>Player Analysis</Link></li>
                                        <li><Link href="/fplservices/fixture-difficulty" className={`block px-2 py-1 rounded hover:text-red-700 transition-colors duration-200 ${isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"}`}>Fixture Difficulty</Link></li>
                                    </ul>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="flex items-center space-x-8">

                            <Link href="/aboutfpl" className={`transition-colors duration-200 ${pathname === "/aboutfpl" ? "text-red-700 font-semibold" : isDarkMode ? "text-white" : "text-gray-800"} hover:text-red-700`}>About FPL</Link>

                            <Link href="/contactfpl" className={`transition-colors duration-200 ${pathname === "/contactfpl" ? "text-red-700 font-semibold" : isDarkMode ? "text-white" : "text-gray-800"} hover:text-red-700`}>Contact FPL</Link>

                        </NavigationMenuItem>



                    </NavigationMenuList>

                </NavigationMenu>

                {/* color mode toggle and login button*/}
                <div className="hidden lg:flex items-center space-x-4">
                    <div className="flex items-center space-x-4">
                        <span className={`mr-2 transition-colors duration-200 ${isDarkMode ? "text-white" : "text-gray-800"}`}> Color Mode</span>
                        <Switch onClick={toggleTheme} />

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