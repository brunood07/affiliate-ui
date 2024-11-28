/* eslint-disable react-hooks/rules-of-hooks */
import { fetchAffiliatePaymentAction } from "@/actions/payments-actions"
import { useQuery } from "@tanstack/react-query"

export function usePayments() {

  const fetchAffiliatePayments = (affiliateId: string, page: number) => {
    return useQuery({
      queryKey: ['affiliate-payments', affiliateId, page],
      queryFn: () => fetchAffiliatePaymentAction(affiliateId, page),
      refetchInterval: 60000
    })
  }

  return { fetchAffiliatePayments }
}