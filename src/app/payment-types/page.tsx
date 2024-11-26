"use client";

import { deletePaymentType, fetchPaymentTypes } from "@/actions/payment-types-actions";
import Pagination from "@/components/pagination/Pagination";
import PaymentTypesList from "@/components/payment-types-list/PaymentTypeList";
import { PaymentTypeListData } from "@/components/payment-types-list/PaymentTypeList.types";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect, useCallback } from "react";

export default function PaymentTypes() {
  const [paymentTypes, setPaymentTypes] = useState<PaymentTypeListData>({} as PaymentTypeListData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true);

  const fetchPaymentTypesData = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetchPaymentTypes(page);
      if (response) {
        setPaymentTypes(response);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to fetch affiliates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleOpenDeletePaymentTypeModal = (id: string) => {
    if (!id) return;
    setIsModalOpen(true);
    setSelectedId(id);
  }

  const handleDeletePaymentType = async () => {
    if (!selectedId) return;
    setIsLoading(true);
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
      await fetchPaymentTypesData(currentPage);
      setIsLoading(false);
      setIsModalOpen(false);
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

  useEffect(() => {
    fetchPaymentTypesData(currentPage)
  }, [currentPage, fetchPaymentTypesData])

  return (
    <div className="flex flex-col w-[1080px] h-full my-2 m-auto">
      <div className="flex flex-col w-full h-full items-center justify-center m-auto">
        { isLoading ? <p>Carregando...</p> :
          <>
            <PaymentTypesList 
              list={paymentTypes.list ?? []} 
              isModalOpen={isModalOpen} 
              handleOpenDeletePaymentTypeModal={handleOpenDeletePaymentTypeModal} 
              handleCloseModal={handleCloseModal}
              handleDeletePaymentType={handleDeletePaymentType}
            />
            <Pagination returnPage={returnPage} currentPage={currentPage} nextPage={nextPage} totalOfPages={paymentTypes.totalOfPages} />
          </>
        }
      </div>
    </div>
  );
}