import Link from "next/link"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu"
import { Switch } from "../ui/switch"
import { Button } from "../ui/button"
import { AiOutlineMenu } from "react-icons/ai";
const Navbar = () => {
    return (
        <header className="py-4  shadow-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* logo */}
                <div className="text-2xl font-bold hover:text-red-700">
                    <Link href="/">FPL News Portal</Link>
                </div>
                {/* desktop links */}
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList >
                        <NavigationMenuItem className="flex items-center space-x-8">

                            <NavigationMenuLink href="/news" className="hover:text-red-700">FPL News</NavigationMenuLink>

                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className=" hover:text-red-700 text-base">FPL Service</NavigationMenuTrigger>
                            <NavigationMenuContent >
                                <div >
                                    <ul className="text-gray-800 rounded-md shadow-md px-4  space-y-2">
                                        <li><NavigationMenuLink href="/fpl-services/link-1" >Link1</NavigationMenuLink></li>
                                        <li><NavigationMenuLink href="/fpl-services/link-2">Link2</NavigationMenuLink></li>
                                        <li><NavigationMenuLink href="/fpl-services/link-3" >Link3</NavigationMenuLink></li>
                                    </ul>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="flex items-center space-x-8">

                            <NavigationMenuLink href="/aboutfpl" className="hover:text-red-700">About FPL</NavigationMenuLink>

                            <NavigationMenuLink href="/contactfpl" className="hover:text-red-700">Contact FPL</NavigationMenuLink>

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
                <div className="lg:hidden">
                    <Button variant="outline"><AiOutlineMenu size={24} /></Button>
                </div>

            </nav>
        </header>
    )
}

export default Navbar