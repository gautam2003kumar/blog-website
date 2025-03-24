'use client'
import { Button } from "@/components/ui/button"
import {    
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormField,
    Form, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { verifySchema } from "@/schemas/verifySchema"
import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast, Toaster } from "sonner"
import * as z from "zod"

const VerifyAccount = () =>{
    const router = useRouter()
    const params = useParams<{ username: string }>()

    const form = useForm<z.infer<typeof verifySchema>>({ 
        resolver: zodResolver(verifySchema),
    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response = await axios.post(`/api/auth/verify-code`, {
                username: params.username,
                code: data.code
            })

            toast.success("Success", {
                description: response.data.message || "Verification successful!"
            })

            router.replace('/auth/sign-in')
            
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>

            if (axiosError.response) {
                // Show specific error message from the response
                toast.error("Verification Failed", {
                    description: axiosError.response?.data.message || "Something went wrong, please try again."
                })
            } else {
                // Handle cases where response is undefined or network errors occur
                toast.error("Unable to verify", {
                    description: "There was an error with the verification process. Please check your internet connection and try again."
                })
            }
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold -tracking-tight lg:text-5xl mb-6">
                        Verify Your Account
                    </h1>
                    <p className="mb-4">
                        Enter the verification code sent to your email
                    </p>
                </div>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Verification code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter code" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="">Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default VerifyAccount;
