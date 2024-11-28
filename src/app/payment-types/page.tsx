"use client";

import { deletePaymentType } from "@/actions/payment-types-actions";
import Pagination from "@/components/pagination/Pagination";
import PaymentTypesList from "@/components/payment-types-list/PaymentTypeList";
import Spinner from "@/components/ui/spinner";
import { usePaymentTypes } from "@/hooks/use-payment-types";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export default function PaymentTypes() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string>("");
  const { fetchPaymentTypes } = usePaymentTypes();
  const { data, isLoading, refetch } = fetchPaymentTypes(currentPage);
  
  const handleOpenDeletePaymentTypeModal = (id: string) => {
    if (!id) return;
    setIsModalOpen(true);
    setSelectedId(id);
  }

  const handleDeletePaymentType = async () => {
    if (!selectedId) return;
    try {
      await deletePaymentType(selectedId);
      toast({
        title: "Success",
        description: "Payment Type deleted successfully.",
      });
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to delete payment type. Please try again.",
        variant: "destructive",
      });
    } finally {
      await refetch();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }
  
  const returnPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  return (
    <div className="flex flex-col w-[1080px] h-full my-2 m-auto">
      <div className="flex flex-col w-full h-full items-center justify-center m-auto">
        { isLoading ? <Spinner /> :
          <>
            <PaymentTypesList 
              list={data.list ?? []} 
              isModalOpen={isModalOpen} 
              handleOpenDeletePaymentTypeModal={handleOpenDeletePaymentTypeModal} 
              handleCloseModal={handleCloseModal}
              handleDeletePaymentType={handleDeletePaymentType}
            />
            <Pagination returnPage={returnPage} currentPage={currentPage} nextPage={nextPage} totalOfPages={data.totalOfPages} />
          </>
        }
      </div>
    </div>
  );
}