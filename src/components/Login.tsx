
import { Dispatch, SetStateAction } from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useToast } from "@/hooks/use-toast"
import { NotAccountType } from '@/types/global'
import { loginApi } from '@/actions/user'


const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
})

const Login = ({setNotAccountType}: {
  setNotAccountType: Dispatch<SetStateAction<NotAccountType>>
}) => {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  })
  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await loginApi(data.email, data.password)
    console.log(res);
    if(res.code === 200){
      toast({
        title: '登录成功',
        description: 'Welcome back, xiaoming@qq.com',
      })
      router.push('/')
    }else{
      toast({
        title: '登录失败',
      })
    }
  }
  return (
    <div className='container2 my-20'>
      <h2 className='text-2xl font-bold text-center mb-2'>Welcome back</h2>
      <p className='text-center mb-6'>Sign in to access an enhanced shopping experience.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Please enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Please enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">Sign in</Button>
        </form>
      </Form>
      <p className="text-center text-sm mt-3">Not a member? <span className="underline text-orange-400 cursor-pointer" onClick={() => setNotAccountType('register')}>Join us.</span></p>
    </div>
  )
}

export default Login