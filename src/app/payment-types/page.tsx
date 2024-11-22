"use client";

import { fetchPaymentTypes } from "@/actions/payment-types-actions";
import Pagination from "@/components/pagination/Pagination";
import PaymentTypesList from "@/components/payment-types-list/PaymentTypeList";
import { PaymentTypeListData } from "@/components/payment-types-list/PaymentTypeList.types";
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
      <div className="flex flex-col w-full h-full items-center justify-center m-auto">
        <PaymentTypesList list={paymentTypes.list ?? []} />
        <Pagination returnPage={returnPage} currentPage={currentPage} nextPage={nextPage} totalOfPages={paymentTypes.totalOfPages} />
      </div>
    </div>
  );
}