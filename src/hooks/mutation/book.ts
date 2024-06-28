import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface RentalData {
  userId: string
  bookId: number
}

const createRental = async (rentalData: RentalData) => {
  const response = await fetch('/api/rentals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rentalData)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to rental')
  }

  return response.json()
}

export const useCreateRental = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createRental,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['rentals'] })
    },
    onError: (error) => {
      toast.error(error ? error.message : '로그인 실패했습니다')
    }
  })
}
