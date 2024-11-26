"use client";

import { deleteAffiliate, fetchAffiliates } from "@/actions/affiliates-actions";
import AffiliatesList from "@/components/affiliates-list/AffiliatesList";
import Pagination from "@/components/pagination/Pagination";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect, useCallback } from "react";

export interface Affiliate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true);

  const fetchAffiliatesData = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetchAffiliates(page);
      if (response) {
        setAffiliates(response);
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
  
  const handleOpenDeleteAffiliateModal = (id: string) => {
    if (!id) return;
    setIsModalOpen(true);
    setSelectedId(id);
  }

  const handleDeleteAffiliate = async () => {
    if (!selectedId) return;
    setIsLoading(true);
    try {
      await deleteAffiliate(selectedId);
      toast({
        title: "Success",
        description: "Affiliate deleted successfully.",
      });
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to delete affiliate. Please try again.",
        variant: "destructive",
      });
    } finally {
      await fetchAffiliatesData(currentPage);
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
    fetchAffiliatesData(currentPage);
  }, [currentPage, fetchAffiliatesData]);
    
  return (
    <div className="flex flex-col w-[1080px] h-full my-2 m-auto">
      <div className="flex flex-col w-full h-full items-center justify-center m-auto">
      {isLoading ? <p>Carregando...</p> :
        <> 
          <AffiliatesList list={affiliates.list ?? []} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} handleDeleteAffiliate={handleDeleteAffiliate} handleOpenDeleteAffiliateModal={handleOpenDeleteAffiliateModal} />
          <Pagination returnPage={returnPage} currentPage={currentPage} nextPage={nextPage} totalOfPages={affiliates.totalOfPages} />
        </>
      }
    </div>
    </div>
  );
}