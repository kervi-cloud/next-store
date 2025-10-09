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
import { useToast } from "@/hooks/use-toast"
import { NotAccountType } from '@/types/global'
import { registerApi } from '@/actions/user'


const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  name: z.string().min(1, { message: 'Please enter your name.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
})

const Register = ({setNotAccountType}: {
  setNotAccountType: Dispatch<SetStateAction<NotAccountType>>
}) => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      password: ''
    },
  })
  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await registerApi(data)
    if(res.code===200){
      toast({
        title: '注册成功',
        description: 'Welcome back, xiaoming@qq.com',
      })
      setNotAccountType('login')
    }else{
      toast({
        title: '注册失败',
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Please enter your name" {...field} />
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

export default Register