'use client'

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { User } from "next-auth"
import { Button } from "@/components/ui/button" 
import { useState, useEffect } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

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
        <nav className="p-4 md:p-6 shadow-md">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Blogify Logo/Title */}
                <a href="#" className="text-2xl font-bold mb-4 md:mb-0">Blogify</a>
                 
                {/* User Session Links */}
                <div className="flex items-center space-x-4">
                    {session ? (
                        <>
                            <Link href= "/write-blog" className="">Write Blog</Link> 
                            <span className="mr-4">Welcome, {user?.username || user?.email}</span>
                            <Link href = {`/dashboard/${user?._id}`}>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>    
                                </Avatar>
                            </Link>
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
