'use client'

import Link from "next/link"
import {NotepadText, LayoutDashboard, LogOut, CircleUser} from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { User } from "next-auth"
import { Button } from "@/components/ui/button" 
import { useState, useEffect, use } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger, SheetFooter, SheetTitle } from "@/components/ui/sheet"

const Navbar = () => {
    const { data: session } = useSession(); 
    const user: User | undefined = session?.user; 
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        } else {
            setIsDarkMode(false);
        }
    }, []);

    return (
        <nav className="p-4 md:p-6 shadow-md bg-gray-100">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Blogify Logo/Title */}
                <Link href={'/'} className="text-2xl font-bold mb-4 md:mb-0">Blogify</Link>
                 
                {/* User Session Links */}
                <div className="flex items-center space-x-4">
                    {session ? (
                        <>
                            <div className="flex items-center space-x-2">
                                <span className="text-base">Welcome</span>
                                <span className="font-bold text-xl">
                                    {user?.username || user?.email}
                                </span>
                            </div>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.image || "https://github.com/shadcn.png"} />
                                        <AvatarFallback>CN</AvatarFallback> 
                                    </Avatar>
                                </SheetTrigger>
                                <SheetContent className=" border-none p-6 space-y-4 bg-transparent max-w-xs mx-auto">
                                    <SheetHeader className="text-center">
                                        <SheetTitle className="sr-only">User Menu</SheetTitle> 
                                        <Avatar className="mx-auto w-16 h-16">
                                            <AvatarImage src={user?.image || "https://github.com/shadcn.png"} />
                                            <AvatarFallback>CN</AvatarFallback> 
                                        </Avatar>                             
                                    </SheetHeader>

                                    
                                    <div className="flex flex-col space-y-3 ">
                                        <Button variant="outline"><Link href="/profile">Edit Profile</Link></Button>
                                        <Button variant="outline" ><Link href="/admin-dashboard">Dashboard</Link></Button>
                                        <Button variant="outline" ><Link href={`/auth/change-password/${user?._id}`}>Change Password</Link></Button>
                                        <Button variant="outline" ><Link href={`/user-blogs/${user?._id}`}>Blogs</Link></Button>
                                        <Button variant="destructive" onClick={() => signOut()}>Logout</Button>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </>
                    ) : (
                        <Link href="/auth/sign-in">
                            <Button className="w-full md:w-auto">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
