import { getSession } from 'next-auth/react'

export const fetchAffiliates = async () => {
  const session = await getSession()

  const response = await fetch('http://localhost:3333/affiliates/list', {
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch affiliates')
  }

  return response.json()
}