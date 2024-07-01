import { useMutation } from '@tanstack/react-query'

interface RentalData {
  userId: string
  bookId: number
}

const createRental = async (rentalData: RentalData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/rentals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rentalData)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to rent')
  }

  return response.json()
}

export const useCreateRental = () => {
  return useMutation({
    mutationFn: createRental
  })
}
