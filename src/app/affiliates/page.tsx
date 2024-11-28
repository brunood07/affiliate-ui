"use client";

import { deleteAffiliate } from "@/actions/affiliates-actions";
import AffiliatesList from "@/components/affiliates-list/AffiliatesList";
import Pagination from "@/components/pagination/Pagination";
import Spinner from "@/components/ui/spinner";
import { useAffiliates } from "@/hooks/use-affiliates";
import { toast } from "@/hooks/use-toast";
import { useState} from "react";

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");

  const { fetchAffiliates } = useAffiliates();
  const { data, isLoading, refetch } = fetchAffiliates(currentPage);
  const handleOpenDeleteAffiliateModal = (id: string) => {
    if (!id) return;
    setIsModalOpen(true);
    setSelectedId(id);
  };

  const handleDeleteAffiliate = async () => {
    if (!selectedId) return;

    try {
      await deleteAffiliate(selectedId);
      toast({
        title: "Success",
        description: "Affiliate deleted successfully.",
      });

      await refetch();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to delete affiliate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const returnPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (data?.totalOfPages && currentPage < data.totalOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };
    
  return (
    <div className="flex flex-col w-[1080px] h-full my-2 m-auto">
      <div className="flex flex-col w-full h-full items-center justify-center m-auto">
      {isLoading ? <Spinner /> :
        <> 
          <AffiliatesList list={data.list ?? []} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} handleDeleteAffiliate={handleDeleteAffiliate} handleOpenDeleteAffiliateModal={handleOpenDeleteAffiliateModal} />
          <Pagination returnPage={returnPage} currentPage={currentPage} nextPage={nextPage} totalOfPages={data.totalOfPages} />
        </>
      }
    </div>
    </div>
  );
}