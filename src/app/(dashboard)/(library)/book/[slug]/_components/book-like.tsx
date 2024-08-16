import { Button } from '@nextui-org/button'
import { Icon } from '@iconify/react'
import { useLikeActions, useLikeQuery } from '@/hooks'

export const BookLike = ({ book }) => {
  const { data: like, isLoading: isLikeLoading } = useLikeQuery(book.id)

  const mutation = useLikeActions(book.id)

  if (isLikeLoading) return null

  const handleLike = () => {
    mutation.mutate()
  }

  return (
    <Button size="lg" isIconOnly variant="light" color={like.success ? 'danger' : 'default'} onPress={handleLike}>
      <Icon icon={like.success ? 'solar:heart-bold' : 'solar:heart-outline'} width={32} height={32} />
    </Button>
  )
}
