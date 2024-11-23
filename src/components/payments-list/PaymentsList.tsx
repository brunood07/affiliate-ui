"use client"

import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export interface Payment {
  paymentId: string;
  registeredByName: string;
  paymentTypeName: string;
  createdAt: string;
}

interface PaymentsListProps {
  list: Payment[];
  affiliateName: string;
  affiliateId: string;
}

export default function PaymentsList({ list, affiliateName, affiliateId }: PaymentsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchList, setSearchList] = useState(list)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)
    const filteredList = list.filter((payment: Payment) => 
      payment.registeredByName.toLowerCase().includes(term) ||
      payment.paymentTypeName.toLowerCase().includes(term) ||
      payment.createdAt.toLowerCase().includes(term)
    )
    setSearchList(filteredList)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Lista de Pagamentos - {affiliateName}</h1>
        <Link className="rounded-lg bg-black text-white p-2" href={`/payments/create/${affiliateId}`}>Registrar Novo Pagamento</Link>
      </div>
      <div className="mb-6 flex items-center">
        <Input
          type="text"
          placeholder="Buscar pagamentos..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm mr-4 bg-white"
        />
        <Button variant="outline" className="flex items-center">
          <Search className="h-4 w-4 mr-2" />
          Buscar
        </Button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <TooltipProvider>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Registrado Por</TableHead>
                <TableHead className="w-[200px]">Tipo de Pagamento</TableHead>
                <TableHead className="w-[200px]">Data de Criação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    Nenhum pagamento encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                list?.map((payment: Payment) => (
                  <TableRow key={payment.paymentId}>
                    <TableCell className="font-medium">{payment.registeredByName}</TableCell>
                    <TableCell>{payment.paymentTypeName}</TableCell>
                    <TableCell>{formatDate(payment.createdAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TooltipProvider>
      </div>
    </div>
  )
}

