'use client'

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { User } from "next-auth"
import { Button } from "@/components/ui/button" 
import { useState, useEffect } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger, SheetFooter } from "@/components/ui/sheet"

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
                            <span className="mr-4">Welcome, {user?.name || user?.email}</span>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.image || "https://github.com/shadcn.png"} />
                                        <AvatarFallback>CN</AvatarFallback> 
                                    </Avatar>
                                </SheetTrigger>
                                <SheetContent className="p-6 space-y-4">
                                    <SheetHeader className="text-center">
                                        <Avatar className="mx-auto w-16 h-16">
                                            <AvatarImage src={user?.image || "https://github.com/shadcn.png"} />
                                            <AvatarFallback>CN</AvatarFallback> 
                                        </Avatar>
                                        <h2 className="text-lg font-semibold mt-2">{user?.name || user?.email}</h2>
                                    </SheetHeader>
                                    
                                    <div className="flex flex-col space-y-3">
                                        <Button variant="outline" className="w-full"><Link href="/profile">Edit Profile</Link></Button>
                                        <Button variant="outline" className="w-full"><Link href="/dashboard">Dashboard</Link></Button>
                                        <Button variant="destructive" className="w-full" onClick={() => signOut()}>Logout</Button>
                                    </div>
                                    
                                    <SheetFooter>
                                        <SheetClose asChild>
                                            <Button variant="secondary" className="w-full">Close</Button>
                                        </SheetClose>
                                    </SheetFooter>
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
