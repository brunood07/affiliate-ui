'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PlusCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addPaymentFormSchema, AddPaymentFormType } from "./add-payment-form-schema"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { createAffiliatePayment, fetchPaymentTypes } from "@/actions/payment-types-actions"
import { toast } from "@/hooks/use-toast"
import { PaymentTypeListData } from "../payment-types-list/PaymentTypeList.types"

interface AddPaymentFormProps {
  affiliateId: string;
}

export default function AddPaymentForm(props: AddPaymentFormProps) {
  const [paymentTypes, setPaymentTypes] = useState<PaymentTypeListData>({} as PaymentTypeListData)
  const router = useRouter()

  const form = useForm<AddPaymentFormType>({
    resolver: zodResolver(addPaymentFormSchema),
    defaultValues: {
      paymentTypeId: ""
    },
  })

  useEffect(() => {
    (async () => {
      try {
        const types = await fetchPaymentTypes(1)
        setPaymentTypes(types)
      } catch (error) {

        if (error instanceof Error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          })
          return
        }

        toast({
          title: "Error",
          description: "Failed to load payment types. Please refresh the page.",
          variant: "destructive",
        })
      }
    })();
  }, [])

  async function onSubmit(values: AddPaymentFormType) {
    if (!props.affiliateId) {
      toast({
        title: "Error",
        description: "Affiliate ID is missing. Please check the URL.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await createAffiliatePayment(
        props.affiliateId,
        values.paymentTypeId 
      )
  
      if (response.id) {
        toast({
          title: "Payment Added",
          description: "The payment was added successfully.",
          duration: 3000,
        })
        router.push('/affiliates/' + props.affiliateId)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: "An unknown error occurred",
          variant: "destructive",
        })
      }
    }
  }

  if (!props.affiliateId) {
    return (
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-red-500">Affiliate ID is missing. Please check the URL.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Adicionar Novo Pagamento</CardTitle>
          <CardDescription className="text-center">Escolha o Tipo de Pagamento</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="paymentTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Pagamento</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a payment type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {paymentTypes?.list?.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
                    Adicionando Pagamento
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Pagamento
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