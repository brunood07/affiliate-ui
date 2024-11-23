import { AddPaymentTypeFormType } from "@/components/add-payment-type-form/add-payment-type-form-schema"
import { baseURL } from "@/constants/endpoints"
import { getSession } from "next-auth/react"

export const fetchPaymentTypes = async (page: number) => {
  try {
    const session = await getSession()

    const response = await fetch(`${baseURL}/list/types?page=${page}&limit=10`, {
      headers: {
        'Authorization': `Bearer ${session?.accessToken}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch affiliates')
    }

    return response.json()
  } catch (err) {
    console.log(err);
  }
}

export const addPaymentType = async (data: AddPaymentTypeFormType) => {
  const session = await getSession()

  const response = await fetch(`${baseURL}/types`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to create Payment Type')
  }

  return response.json()
}

export const createAffiliatePayment = async (affiliateId: string, paymentTypeId: string) => {
  if (!affiliateId || !paymentTypeId) {
    throw new Error("Both affiliateId and paymentTypeId are required.");
  }

  const session = await getSession()

  const response = await fetch(`${baseURL}/payments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      affiliateId,
      paymentTypeId
    })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to create Payment Type')
  }

  return response.json()
}