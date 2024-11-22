"use client";

import { fetchPaymentTypes } from "@/actions/payment-types-actions";
import Pagination from "@/components/pagination/Pagination";
import PaymentTypesList from "@/components/payment-types-list/PaymentTypeList";
import { PaymentTypeListData } from "@/components/payment-types-list/PaymentTypeList.types";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function PaymentTypes() {
  const [paymentTypes, setPaymentTypes] = useState<PaymentTypeListData>({} as PaymentTypeListData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  useEffect(() => {
    (async () => {
      const response = await fetchPaymentTypes(currentPage);
      if (response) {
        setPaymentTypes(response);
      }
    })()
  }, [currentPage])
  
  const returnPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  return (
    <div className="flex flex-col w-[1080px] h-full my-2 m-auto">
      <div className="flex flex-row justify-between">
        <p className="w-auto font-bold text-xl my-2">Lista de Tipos de Pagamentos</p>
        <Link className="rounded-lg bg-black text-white p-2" href="/payment-types/create">Adicionar Novo</Link>
      </div>
      <div className="flex flex-col w-full h-full items-center justify-center m-auto">
        <PaymentTypesList list={paymentTypes.list ?? []} />
        <Pagination returnPage={returnPage} currentPage={currentPage} nextPage={nextPage} totalOfPages={paymentTypes.totalOfPages} />
      </div>
    </div>
  );
}