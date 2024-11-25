"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from "next-auth/react";

export const loginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export const loginResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string()
})

export type LoginResponse = z.infer<typeof loginResponseSchema>

export type LoginFormType = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const form = useForm<LoginFormType>({
    mode: 'all',
    resolver: zodResolver(loginFormSchema),
  });

  const {
    register,
    handleSubmit,
  } = form;

  const onSubmit = async (formData: LoginFormType) => {
    try {
      await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: true,
        callbackUrl: '/dashboard'
      })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 items-center justify-center">
      <Input {...register('email', { required: 'Email is required' })}  name="email" type="email" className="w-44 bg-white" placeholder="email" required />
      <Input {...register('password', { required: 'Password is required' })}  name="password" type="password" className="w-44 bg-white" placeholder="senha" required />
      <Button type="submit" className="w-44">Entrar</Button>
    </form>
  )
}