import { createClient } from '@/utils/supabase/server'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { kstFormat } from '@/utils/date'

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()

  const { data: event, error } = await supabase.from('events').select('*').eq('event_id', params.slug).maybeSingle()

  if (!event || error) {
    return <div>Error loading event</div>
  }

  try {
    const res = await fetch(event.content)
    const markdownSource = await res.text()

    return (
      <Card fullWidth isBlurred className="p-4 sm:p-12">
        <CardHeader className="w-full flex items-end justify-between">
          <span className="text-2xl sm:text-5xl font-black">{event.event_name}</span>
          <span className="text-tiny text-default-500">{kstFormat(new Date(event.created_at), 'yyyy-MM-dd')}</span>
        </CardHeader>
        <CardBody className="!max-w-full prose dark:prose-invert">
          <MDXRemote source={markdownSource} />
        </CardBody>
      </Card>
    )
  } catch (err) {
    return <div>{err.message}</div>
  }
}
