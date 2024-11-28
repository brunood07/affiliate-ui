/* eslint-disable react-hooks/rules-of-hooks */
import { fetchPaymentTypesAction, getPaymentTypeInfo } from "@/actions/payment-types-actions"
import { useQuery } from "@tanstack/react-query"

export function usePaymentTypes() {
  const fetchPaymentTypes = (page: number, active?: boolean) => {
    return useQuery({
      queryKey: ['paymentTypes', page],
      queryFn: () => fetchPaymentTypesAction(page, active),
      refetchInterval: 60000
    })
  }

  const fetchPaymentTypeInfo = (paymentTypeId: string) => {
    return useQuery({
      queryKey: ['paymentType', paymentTypeId],
      queryFn: () => getPaymentTypeInfo(paymentTypeId),
      refetchInterval: 60000
    })
  }

  return {
    fetchPaymentTypes,
    fetchPaymentTypeInfo
  }
}