import { AddPaymentTypeFormType } from "@/components/add-payment-type-form/add-payment-type-form-schema"
import { getSession } from "next-auth/react"

export const fetchPaymentTypes = async (page: number) => {
  try {
    const session = await getSession()

    const response = await fetch(`http://localhost:3333/list/types?page=${page}&limit=10`, {
      headers: {
        'Authorization': `Bearer ${session?.accessToken}`
      }
    })
    console.log("🚀 ~ fetchPaymentTypes ~ response:", response)

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

  const response = await fetch('http://localhost:3333/types', {
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