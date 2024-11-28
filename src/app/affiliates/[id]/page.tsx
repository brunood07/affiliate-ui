"use client";

import Pagination from "@/components/pagination/Pagination";
import PaymentsList from "@/components/payments-list/PaymentsList";
import Spinner from "@/components/ui/spinner";
import { usePayments } from "@/hooks/use-payments";
import { useState, use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { fetchAffiliatePayments } = usePayments();
  const { data, isLoading } = fetchAffiliatePayments(id, currentPage);

  const returnPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  return (
  <div className="flex flex-col w-[1080px] h-full my-2 m-auto">
    <div className="flex flex-col w-full h-full items-center justify-center m-auto">
      {isLoading ? <Spinner /> :
        <>
          <PaymentsList list={data?.list} affiliateName={data?.affiliateName} affiliateId={id} />
          <Pagination returnPage={returnPage} currentPage={currentPage} nextPage={nextPage} totalOfPages={data.totalOfPages} />
        </>
      }
    </div>
  </div>)
}