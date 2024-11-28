"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { UserPlus } from 'lucide-react'
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { UpdateAffiliateFormType, updateAffiliateFormSchema } from "./update-affiliate-form-schema"
import { useEffect } from "react"
import Spinner from "../ui/spinner"
import { updateAffiliateInfo } from "@/actions/affiliates-actions"
import { useAffiliates } from "@/hooks/use-affiliates"

interface UpdateAffiliateFormProps {
  affiliateId: string;
}

export default function UpdateAffiliateForm(props: UpdateAffiliateFormProps) {
  const{ fetchAffiliateInfo } = useAffiliates();
  const { data, isLoading } = fetchAffiliateInfo(props.affiliateId);

  const form = useForm<UpdateAffiliateFormType>({
    resolver: zodResolver(updateAffiliateFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
  })
 
  async function onSubmit(values: UpdateAffiliateFormType) {
    try {
      const response = await updateAffiliateInfo(props.affiliateId, values);
      if (!response.error) {
        toast({
          title: "Afiliado atualizado",
          description: "O afiliado foi atualizado com sucesso.",
          duration: 3000,
        })
        window.location.href = "/affiliates";
      }
    } catch (error) {
      if (error instanceof Error) {
        form.setError("email", { message: error.message });
        form.setError("phoneNumber", { message: error.message });
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive",
        })
      } else {
        form.setError("email", { message: "Ocorreu um erro desconhecido" });
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
      if (data) {
        form.reset({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
        })
      }
    })()
    }, [props.affiliateId, form, data])

  return (
    <div className="flex items-center justify-center p-4">
      {isLoading ? <Spinner /> : 
        <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Atualizar Afiliado</CardTitle>
          <CardDescription className="text-center">Preencha os detalhes a serem atualizados abaixo.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome" {...field} />
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
                        <Input placeholder="Sobrenome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="email@exemplo.com" type="email" {...field} />
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
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
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
                    Adicionando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Atualizar Afiliado
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>}
    </div>
  )
}