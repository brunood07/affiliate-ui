"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login } from "@/lib/session-actions";

export const loginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export const loginResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

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
    const parsedData = loginFormSchema.safeParse(formData);
    if (!parsedData.success) return;
    await login(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 items-center justify-center">
      <Input {...register('email', { required: 'Email is required' })}  name="email" type="email" className="w-44" placeholder="email" required />
      <Input {...register('password', { required: 'Password is required' })}  name="password" type="password" className="w-44" placeholder="senha" required />
      <Button type="submit" className="w-44">Entrar</Button>
    </form>
  )
}