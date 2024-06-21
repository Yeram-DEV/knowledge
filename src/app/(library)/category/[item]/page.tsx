import { Card, CardBody } from '@nextui-org/card'

async function getBookLists({ category }: { category: string }) {
  const res = await fetch(`http://localhost:4100/books?category=${category}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
    }
  })

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res.json()
}

export default async function CategoryItemPage({ params }: { params: { item: string } }) {
  const bookLists = await getBookLists({ category: params.item })
  console.log(bookLists)
  return (
    <div className="w-full flex flex-wrap">
      <Card>
        <CardBody></CardBody>
      </Card>
    </div>
  )
}
