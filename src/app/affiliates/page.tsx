"use client";

import AffiliatesList from "@/components/affiliates-list/AffiliatesList";
import { fetchAffiliates } from "@/lib/fetch-affiliates";
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
  
  useEffect(() => {
    fetchAffiliates("http://localhost:3333/affiliates/list").then(
      async (response) => {
        try {
          if (response.status === 200) {
            const jsonData = await response.json()
            setAffiliates(jsonData)
          }
        } catch (err) {
          console.log(err);
        }
      })
    }, [])
    
  return (
    <div className="flex flex-col w-[1080px] h-full my-2 m-auto">
      <p className="w-auto font-bold text-xl my-2">Lista de Afiliados</p>
      <div className="flex flex-col w-full h-full items-center justify-center m-auto">
        <AffiliatesList list={affiliates?.list ?? []} />
      </div>
    </div>
  );
}