"use client";

import { fetchAffiliatePayment } from "@/actions/affiliates-actions";
import Pagination from "@/components/pagination/Pagination";
import PaymentsList, { Payment } from "@/components/payments-list/PaymentsList";
import { useState, useEffect, use } from "react";

interface ListPaymentsRes {
  page: number;
  limit: number;
  totalOfRecords: number;
  totalOfPages: number;
  affiliateName: string;
  list: Payment[];
}

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = use(params); 
  const [payments, setPayments] = useState<ListPaymentsRes>({} as ListPaymentsRes);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        const response = await fetchAffiliatePayment(id, currentPage);
        if (response) {
          setPayments(response);
        }
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    })();
  }, [id, currentPage]);

  const returnPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  return (
  <div className="flex flex-col w-[1080px] h-full my-2 m-auto">
    <div className="flex flex-col w-full h-full items-center justify-center m-auto">
      <PaymentsList list={payments?.list} affiliateName={payments?.affiliateName} affiliateId={id} />
      <Pagination returnPage={returnPage} currentPage={currentPage} nextPage={nextPage} totalOfPages={payments.totalOfPages} />
    </div>
  </div>)
}