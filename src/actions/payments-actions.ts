import { baseURL } from "@/constants/endpoints"
import { getSession } from "next-auth/react"

const fetchAffiliatePaymentAction = async (id: string, page: number) => {
  const session = await getSession()

  const response = await fetch(`${baseURL}/affiliate/payments/${id}?page=` + page, {
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json'
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to fetch affiliate payments')
  }

  return response.json()
}

export { fetchAffiliatePaymentAction }