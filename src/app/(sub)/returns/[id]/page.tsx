import { SubHeader } from '@/components/common'
import { CameraScreen } from '@/components/returns/camera-screen'
import { Rental } from '@/types/book'
import { auth } from '@/auth'

async function getRental({ id }: { id: number }): Promise<Rental> {
  const res = await fetch(`http://localhost:4100/rentals/${id}`, {
    cache: 'no-cache',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
    }
  })

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res.json()
}

export default async function ReturnsIdPage({ params }: { params: { id: number } }) {
  const rental = await getRental({ id: params.id })
  const session = await auth()

  if (rental.user.id !== session.user.id) {
    return null
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <SubHeader props={{ className: '!fixed backdrop-blur-sm bg-background/0 sm:hidden h-[3rem] !z-50' }} />
      <CameraScreen rental={rental} session={session} />
    </div>
  )
}
