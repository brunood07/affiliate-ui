/* eslint-disable react-hooks/rules-of-hooks */
import { fetchAffiliatesAction, getAffiliateInfo } from "@/actions/affiliates-actions"
import { useQuery } from "@tanstack/react-query"

export function useAffiliates() {
  const fetchAffiliateInfo = (affiliateId: string) => {
    return useQuery({
      queryKey: ['affiliate', affiliateId],
      queryFn: () => getAffiliateInfo(affiliateId),
      refetchInterval: 60000
    })
  }

  const fetchAffiliates = (page: number) => {
    return useQuery({
      queryKey: ['affiliates', page],
      queryFn: () => fetchAffiliatesAction(page),
      refetchInterval: 60000
    })
  }

  return {
    fetchAffiliateInfo,
    fetchAffiliates
  }
}