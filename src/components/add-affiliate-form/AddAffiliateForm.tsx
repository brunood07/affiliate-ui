"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { addAffiliateFormSchema, addAffiliateFormType } from "./add-affiliate-form-schema"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addAffiliate } from "@/actions/affiliates-actions"

export default function AddAffiliateForm() {

 const form = useForm<addAffiliateFormType>({
    resolver: zodResolver(addAffiliateFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
  })

  async function onSubmit(values: addAffiliateFormType) {
    try {
      const response = await addAffiliate(values);
      if (!response.error) {
        window.location.href = "/affiliates";
      }
    } catch (error) {
      if (error instanceof Error) {
        form.setError("email", { message: error.message });
        form.setError("phoneNumber", { message: error.message });
      } else {
        form.setError("email", { message: "An unknown error occurred" });
      }
    }
  }

  return (
    <Form {...form}>
        <div className="flex items-center justify-center max-w-[400px] w-full mt-4 m-auto">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do Afiliado" className="bg-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sobrenome</FormLabel>
                  <FormControl>
                    <Input placeholder="Sobrenome do Afiliado" className="bg-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="E-mail do Afiliado" type="email" className="bg-white"{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="Telefone do Afiliado" className="bg-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-[280px] m-auto" disabled={!form.formState.isValid || form.formState.isSubmitting}>Adicionar</Button>          </form>
        </div>
      </Form>
  )
}