'use client'

import { Button } from '@nextui-org/button'
import { Rental } from '@/types/book'
import { Card, CardBody } from '@nextui-org/card'
import Image from 'next/image'
import { kstFormat } from '@/libs/date'
import { outline, Scanner } from '@yudiel/react-qr-scanner'
import { toast } from 'sonner'
import { useCreateReturn } from '@/hooks/mutation/book'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'

export const CameraScreen = ({ rental, session }: { rental: Rental; session: Session }) => {
  const { mutate: createReturn } = useCreateReturn()
  const router = useRouter()

  return (
    <>
      <Scanner
        formats={['qr_code', 'micro_qr_code', 'rm_qr_code', 'maxi_code']}
        components={{
          torch: false,
          zoom: true,
          finder: false,
          tracker: outline
        }}
        classNames={{ container: 'w-full !h-[100dvh]', video: 'object-cover' }}
        allowMultiple={true}
        scanDelay={2000}
        onScan={(result) => {
          if (result.at(0).rawValue !== 'knowledge_center_returns') {
            toast.error('QR 코드가 이상합니다')
            return
          }
          createReturn(
            { userId: session.user.id, bookId: rental.book.id },
            {
              onSuccess: () => {
                toast.success('반납 하였습니다')
                router.push(`/book/${rental.book.id}`)
              },
              onError: (error) => toast.error(error?.message || '반납에 실패했습니다')
            }
          )
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none  p-4">
          <div className="relative w-full sm:w-1/3 h-72 sm:h-[800px] border-4 border-white rounded-lg"></div>
        </div>
      </Scanner>

      <div className="w-full sm:w-1/3 absolute top-20 z-40 px-4">
        <Card isBlurred>
          <CardBody className="w-full flex flex-row items-center justify-between gap-5">
            <Image src={rental.book.details.cover_image_url} alt="book cover" width={40} height={40} />
            <div className="w-full flex flex-col items-end justify-center">
              <span className="text-2xl font-bold line-clamp-1">{rental.book.book_name}</span>
              <div className="w-full flex items-center justify-end gap-2">
                <span>{rental.book.author}</span>|
                <span>{kstFormat(new Date(rental.book.publication_date), 'yyyy-MM-dd')}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="w-full sm:w-1/3 absolute bottom-4 z-40 px-4">
        <Button fullWidth size="lg" color="primary">
          강제로 반납하기
        </Button>
      </div>
    </>
  )
}
