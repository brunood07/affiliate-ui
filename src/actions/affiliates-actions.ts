import { addAffiliateFormType } from '@/components/add-affiliate-form/add-affiliate-form-schema'
import { baseURL } from '@/constants/endpoints'
import { getSession } from 'next-auth/react'

export const fetchAffiliates = async (page: number) => {
  const session = await getSession()
  const response = await fetch(`${baseURL}/affiliates/list?page=` + page, {
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch affiliates')
  }

  return response.json()
}

export const addAffiliate = async (data: addAffiliateFormType) => {
  const session = await getSession()

  const response = await fetch(`${baseURL}/affiliates`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to create Affiliate')
  }

  return response.json()
}

export const fetchAffiliatePayment = async (id: string, page: number) => {
  const session = await getSession()

  const response = await fetch(`${baseURL}/affiliate/payments/${id}?page=` + page, {
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json'
    },
  })
  console.log("🚀 ~ fetchAffiliatePayment ~ response:", response)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to fetch affiliate payments')
  }

  return response.json()
}