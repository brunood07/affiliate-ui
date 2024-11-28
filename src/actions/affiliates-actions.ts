import { addAffiliateFormType } from '@/components/add-affiliate-form/add-affiliate-form-schema'
import { UpdateAffiliateFormType } from '@/components/update-affiliate-form/update-affiliate-form-schema'
import { baseURL } from '@/constants/endpoints'
import { getSession } from 'next-auth/react'

export const fetchAffiliatesAction = async (page: number) => {
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

const addAffiliate = async (data: addAffiliateFormType) => {
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

const getAffiliateInfo = async (affiliateId: string) => {
  const session = await getSession()

  const response = await fetch(`${baseURL}/affiliates/info/${affiliateId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json'
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to update Affiliate')
  }

  return response.json()
}

const updateAffiliateInfo = async (affiliateId: string, data: UpdateAffiliateFormType) => {
  const session = await getSession()

  const response = await fetch(`${baseURL}/affiliates/${affiliateId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to update Affiliate')
  }

  return response.json()
}

const deleteAffiliate = async (affiliateId: string) => {
  const session = await getSession()

  await fetch(`${baseURL}/affiliates/${affiliateId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json'
    },
  })
}

export { addAffiliate, deleteAffiliate, updateAffiliateInfo, getAffiliateInfo };