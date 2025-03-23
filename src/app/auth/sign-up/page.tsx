'use client'
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { useDebounceValue } from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/ApiResponse"

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const [debouncedUsername] = useDebounceValue(username, 300)

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })
  console.log(form);
  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true)
        setUsernameMessage('')

        try {
          const response = await axios.get(`/api/auth/check-username-unique?username=${encodeURIComponent(debouncedUsername)}`)
          if(!response){
            console.log("somthing is woring")
          }
          setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          )
        } finally {
          setIsCheckingUsername(false)
        }
      }
    }
    checkUsernameUnique()
  }, [debouncedUsername])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)

    try {
      const response = await axios.post<ApiResponse>('/api/auth/sign-up', data)
      toast.success("You registered successfully", {
        description: "Verify using the verification code",
      })
      router.replace(`/verify/${username}`)
    } catch (error) {
      console.error("Error in signup of user", error)
      const axiosError = error as AxiosError<ApiResponse>
      let errorMessage = axiosError.response?.data.message

      toast.error("Signup failed", {
        description: errorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-00 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight lg:text-5xl mb-6">
            Join Blogify
          </h1>
          <p className="mb-4 text-gray-600">Sign up to share your thoughts</p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            {...form.register('username')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          {isCheckingUsername && <p className="text-gray-500">Checking username...</p>}
          {!isCheckingUsername && usernameMessage && (
            <p className={`text-sm ${usernameMessage === 'Great choice! This username is available.' ? 'text-green-700' : 'text-red-700'}`}>{usernameMessage}</p>
          )}

          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            {...form.register('email')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />

          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...form.register('password')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Please wait...' : 'Sign Up'}
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <a href="/auth/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
