import { createClient } from '@/utils/supabase/server'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { kstFormat } from '@/utils/date'
import { notFound } from 'next/navigation'

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()

  const { data: event, error } = await supabase.from('events').select('*').eq('event_id', params.slug).maybeSingle()

  if (!event || error) {
    notFound()
  }

  return (
    <Card fullWidth isBlurred shadow="none" className="p-4 sm:p-12">
      <CardHeader className="w-full flex items-end justify-between">
        <span className="text-2xl sm:text-5xl font-black">{event.event_name}</span>
        <span className="text-tiny text-default-500">{kstFormat(new Date(event.created_at), 'yyyy-MM-dd')}</span>
      </CardHeader>
      <CardBody
        className="relative w-full !max-w-full prose dark:prose-invert px-2 sm:px-12 py-4"
        dangerouslySetInnerHTML={{ __html: event.content }}
      ></CardBody>
    </Card>
  )
}
