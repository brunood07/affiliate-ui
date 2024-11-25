import { baseURL } from "@/constants/endpoints"
import { getSession } from "next-auth/react"

const getStats = async () => {
  const session = await getSession()

  const response = await fetch(`${baseURL}/affiliates/stats`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json'
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to fetch stats')
  }

  return response.json()
}

export { getStats };