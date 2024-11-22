"use client";

import { fetchAffiliates } from "@/actions/affiliates-actions";
import AffiliatesList from "@/components/affiliates-list/AffiliatesList";
import Pagination from "@/components/pagination/Pagination";
import Link from "next/link";
import { useState, useEffect } from "react";

export interface Affiliate {
  _id: {
    value: string;
  };
  props: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }
}

export interface AffiliatesListResponse {
  page: number;
  limit: number;
  totalOfRecords: number;
  totalOfPages: number;
  list: Affiliate[];
}

export default function Affiliates() {
  const [affiliates, setAffiliates] = useState<AffiliatesListResponse>({} as AffiliatesListResponse);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  useEffect(() => {
  (async () => {
    const response = await fetchAffiliates(currentPage);
    if (response) {
      setAffiliates(response);
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
        <p className="w-auto font-bold text-xl my-2">Lista de Afiliados</p>
        <Link className="rounded-lg bg-black text-white p-2" href="/affiliates/create">Adicionar Novo</Link>
      </div>
      <div className="flex flex-col w-full h-full items-center justify-center m-auto">
        <AffiliatesList list={affiliates?.list ?? []} />
        <Pagination returnPage={returnPage} currentPage={currentPage} nextPage={nextPage} totalOfPages={affiliates.totalOfPages} />
      </div>
    </div>
  );
}