"use client"

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Edit, Trash2, Search } from 'lucide-react'
import { PaymentTypeList } from "./PaymentTypeList.types"
import Link from "next/link";
import { GenericConfirmationModal } from "../generic-confirmation-modal/GenericConfirmationModal";

interface PaymentTypesListProps {
  list?: PaymentTypeList[]
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleDeletePaymentType: () => void;
  handleOpenDeletePaymentTypeModal: (id: string) => void;
}

export default function PaymentTypesList({ list, handleCloseModal, handleDeletePaymentType, handleOpenDeletePaymentTypeModal, isModalOpen }: PaymentTypesListProps) {
  const [searchTerm, setSearchTerm] = useState("");
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchList, setSearchList] = useState(list);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    if (!list) return;
    const filteredList = list.filter(paymentType => 
      paymentType.name.toLowerCase().includes(term) ||
      paymentType.quantity.toString().includes(term)
    );
    setSearchList(filteredList);
  };

  const handleUpdatePaymentType = (id: string) => {
    window.location.href = "/payment-types/update/" + id;
  };

  return (
    <div className="container mx-auto px-4 py-8">
       <GenericConfirmationModal 
        cancelText="Cancelar" 
        confirmText="Deletar" 
        title="Deletar Tipo de Pagamento" 
        description="Deseja deletar o Tipo de Pagamento?" 
        isOpen={isModalOpen}
        onClose={() => handleCloseModal()}
        onConfirm={() => handleDeletePaymentType()}
      />

      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Tipos de Pagamento</h1>
        <Link className="rounded-lg bg-black text-white p-2" href="/payment-types/create">Adicionar Novo</Link>
      </div>

      <div className="mb-6 flex items-center">
        <Input
          type="text"
          placeholder="Buscar tipos de pagamento..."
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
                <TableHead className="w-[200px]">Nome</TableHead>
                <TableHead className="w-[200px]">Quantidade</TableHead>
                <TableHead className="w-[200px]">Ativo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    Nenhum tipo de pagamento encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                list?.map((paymentType: PaymentTypeList) => (
                  <TableRow key={paymentType.id}>
                    <TableCell className="font-medium">{paymentType.name}</TableCell>
                    <TableCell>{paymentType.quantity}</TableCell>
                    <TableCell>
                      <Checkbox 
                        checked={paymentType.active} 
                        onCheckedChange={() => null}
                        className="w-5 h-5"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-blue-600 border-blue-600 hover:bg-blue-50 focus:ring-blue-500"
                              onClick={() => handleUpdatePaymentType(paymentType.id)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="rounded-lg bg-pink-50 p-2 text-black shadow-sm">
                            <p>Atualizar tipo de pagamento</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-600 hover:bg-red-50 focus:ring-red-500"
                              onClick={() => handleOpenDeletePaymentTypeModal(paymentType.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Deletar
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="rounded-lg bg-pink-50 p-2 text-black shadow-sm">
                            <p>Deletar tipo de pagamento</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
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

