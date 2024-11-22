"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import { addPaymentTypeFormSchema, AddPaymentTypeFormType } from "./add-payment-type-form-schema"
import { addPaymentType } from "@/actions/payment-types-actions"
import { Checkbox } from "../ui/checkbox"

export default function AddPaymentTypeForm() {

 const form = useForm<AddPaymentTypeFormType>({
    resolver: zodResolver(addPaymentTypeFormSchema),
    defaultValues: {
      name: "",
      quantity: "",
      active: false
    },
  })

  async function onSubmit(values: AddPaymentTypeFormType) {
    try {
      const response = await addPaymentType(values);
      if (!response.error) {
        window.location.href = "/payment-types";
      }
    } catch (error) {
      if (error instanceof Error) {
        form.setError("name", { message: error.message });
        form.setError("quantity", { message: error.message });
      } else {
        form.setError("name", { message: "An unknown error occurred" });
      }
    }
  }

  return (
    <Form {...form}>
        <div className="flex items-center justify-center max-w-[400px] w-full mt-4 m-auto">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do Tipo de Pagamento" className="bg-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Quantidade de pagamento" className="bg-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ativo?</FormLabel>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} {...field} value={field.value.toString()} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-[280px] m-auto" disabled={!form.formState.isValid || form.formState.isSubmitting}>Adicionar</Button>          
          </form>
        </div>
      </Form>
  )
}