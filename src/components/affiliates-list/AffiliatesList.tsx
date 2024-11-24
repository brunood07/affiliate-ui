import { Affiliate } from "@/app/affiliates/page";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "../ui/table";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { CreditCard, Edit, Search, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import { GenericConfirmationModal } from "../generic-confirmation-modal/GenericConfirmationModal";

interface AffiliatesListProps {
  list: Affiliate[];
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleDeleteAffiliate: () => void;
  handleOpenDeleteAffiliateModal: (id: string) => void;
}
 
export default function AffiliatesList({ list, handleCloseModal, handleDeleteAffiliate, handleOpenDeleteAffiliateModal, isModalOpen }: AffiliatesListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchList, setSearchList] = useState(list);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredList = list.filter((affiliate: Affiliate) => 
      `${affiliate.firstName} ${affiliate.lastName}`.toLowerCase().includes(term) ||
      affiliate.email.toLowerCase().includes(term) ||
      affiliate.phoneNumber.includes(term)
    );
    setSearchList(filteredList);
  };

  const handleOpenPayments = (id: string) => {
    window.location.href = "/affiliates/" + id;
  };

  const handleUpdateAffiliate = (id: string) => {
    window.location.href = "/affiliates/update/" + id;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <GenericConfirmationModal 
        cancelText="Cancelar" 
        confirmText="Deletar" 
        title="Deletar Afiliado" 
        description="Deseja deletar o afiliado?" 
        isOpen={isModalOpen}
        onClose={() => handleCloseModal()}
        onConfirm={() => handleDeleteAffiliate()}
      />
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Lista de Afiliados</h1>
        <Link className="rounded-lg bg-black text-white p-2" href="/affiliates/create">Adicionar Novo</Link>
      </div>
      <div className="mb-6 flex items-center">
        <Input
          type="text"
          placeholder="Buscar afiliados..."
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
                <TableHead className="w-[200px]">Nome Completo</TableHead>
                <TableHead className="w-[200px]">Telefone</TableHead>
                <TableHead className="w-[200px]">Email</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    Nenhum afiliado encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                list.map((affiliate: Affiliate) => (
                  <TableRow key={affiliate.id}>
                    <TableCell className="font-medium">{affiliate.firstName} {affiliate.lastName}</TableCell>
                    <TableCell>{affiliate.phoneNumber}</TableCell>
                    <TableCell>{affiliate.email}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-blue-600 border-blue-600 hover:bg-blue-50 focus:ring-blue-500"
                              onClick={() => handleOpenPayments(affiliate.id)}
                            >
                              <CreditCard className="h-4 w-4 mr-2" />
                              Pagamentos
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="rounded-lg bg-pink-50 p-2 text-black shadow-sm">
                            <p>Abrir lista de pagamentos</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-600 hover:bg-green-50 focus:ring-green-500"
                              onClick={() => handleUpdateAffiliate(affiliate.id)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="rounded-lg bg-pink-50 p-2 text-black shadow-sm">
                            <p>Atualizar afiliado</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-600 hover:bg-red-50 focus:ring-red-500"
                              onClick={() => handleOpenDeleteAffiliateModal(affiliate.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Deletar
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="rounded-lg bg-pink-50 p-2 text-black shadow-sm">
                            <p>Deletar afiliado</p>
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
