"use client";

import { fetchAffiliates } from "@/actions/affiliates-actions";
import AffiliatesList from "@/components/affiliates-list/AffiliatesList";
import { useSession } from "next-auth/react";
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
  const { data: session } = useSession();
  
  useEffect(() => {
  (async () => {
    const response = await fetchAffiliates();
    if (response) {
      setAffiliates(response);
    }
  })()
  }, [session])
    
  return (
    <div className="flex flex-col w-[1080px] h-full my-2 m-auto">
      <p className="w-auto font-bold text-xl my-2">Lista de Afiliados</p>
      <div className="flex flex-col w-full h-full items-center justify-center m-auto">
        <AffiliatesList list={affiliates?.list ?? []} />
      </div>
    </div>
  );
}