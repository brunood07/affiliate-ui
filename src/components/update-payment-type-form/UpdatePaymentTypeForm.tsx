"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PlusCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { UpdatePaymentTypeFormType, updatePaymentTypeFormSchema } from "./update-payment-type-form-schema"
import { getPaymentTypeInfo, updatePaymentTypeInfo } from "@/actions/payment-types-actions"
import { useEffect } from "react"

interface UpdatePaymentTypeFormProps {
  paymentTypeId: string;
}

export default function UpdatePaymentTypeForm(props: UpdatePaymentTypeFormProps) {
  const form = useForm<UpdatePaymentTypeFormType>({
    resolver: zodResolver(updatePaymentTypeFormSchema),
    defaultValues: {
      name: '',
      quantity: '',
      active: false
    },
  })

  async function onSubmit(values: UpdatePaymentTypeFormType) {
    try {
      const response = await updatePaymentTypeInfo(props.paymentTypeId, values);
      if (!response.error) {
        toast({
          title: "Tipo de Pagamento adicionado",
          description: "O tipo de pagamento foi adicionado com sucesso.",
          duration: 3000,
        })
        window.location.href = "/payment-types";
      }
    } catch (error) {
      if (error instanceof Error) {
        form.setError("name", { message: error.message });
        form.setError("quantity", { message: error.message });
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive",
        })
      } else {
        form.setError("name", { message: "Ocorreu um erro desconhecido" });
        toast({
          title: "Erro",
          description: "Ocorreu um erro desconhecido",
          variant: "destructive",
        })
      }
    }
  }

  useEffect(() => {
    (async () => {
      const response = await getPaymentTypeInfo(props.paymentTypeId);
      if (response) {
        form.reset({
          name: response.name ?? '',
          quantity: response.quantity ?? 0,
          active: response.active ?? false
        });
      }
    })()
    }, [props.paymentTypeId, form])

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Adicionar Novo Tipo de Pagamento</CardTitle>
          <CardDescription className="text-center">Preencha os detalhes do novo tipo de pagamento abaixo.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do Tipo de Pagamento" {...field} />
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
                      <Input placeholder="Quantidade de pagamento" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Ativo
                      </FormLabel>
                      <FormDescription>
                        Este tipo de pagamento está ativo e disponível para uso.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full"
                disabled={!form.formState.isValid || form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adicionando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Tipo de Pagamento
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}