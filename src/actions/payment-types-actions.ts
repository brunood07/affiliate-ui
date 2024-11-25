import { AddPaymentTypeFormType } from "@/components/add-payment-type-form/add-payment-type-form-schema"
import { UpdatePaymentTypeFormType } from "@/components/update-payment-type-form/update-payment-type-form-schema"
import { baseURL } from "@/constants/endpoints"
import { getSession } from "next-auth/react"

export const fetchPaymentTypes = async (page: number, active?: boolean) => {
  try {
    const session = await getSession()

    const response = await fetch(`${baseURL}/list/types?page=${page}&limit=10&active=${active}`, {
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

export const getPaymentTypeInfo = async (paymentTypeId: string) => {
  const session = await getSession()

  const response = await fetch(`${baseURL}/types/${paymentTypeId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json'
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to get Payment Type information')
  }

  return response.json()
}

export const updatePaymentTypeInfo = async (paymentTypeId: string, data: UpdatePaymentTypeFormType) => {
  console.log("🚀 ~ updatePaymentTypeInfo ~ data:", data)
  const session = await getSession()

  const response = await fetch(`${baseURL}/types/${paymentTypeId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to update Payment Type')
  }

  return response.json()
}

export const deletePaymentType = async (paymentTypeId: string) => {
  const session = await getSession()

  const response = await fetch(`${baseURL}/types/${paymentTypeId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json'
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to delete PaymentType')
  }

  return response.json()
}