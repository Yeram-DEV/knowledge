import { NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'

type Fields = {
  book_name?: string
  author?: string
  category?: string
  publisher?: string
  description?: string
  table_of_contents?: string
  publication_date?: string
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const fields: Fields = {}
    let file: File | null = null

    formData.forEach((value, key) => {
      if (value instanceof File) {
        file = value
      } else {
        fields[key as keyof Fields] = value.toString()
      }
    })

    const { book_name, author, category, publisher, description, table_of_contents, publication_date } = fields

    if (
      !book_name ||
      !author ||
      !category ||
      !publisher ||
      !description ||
      !table_of_contents ||
      !publication_date ||
      !file
    ) {
      return Response.json({ error: 'Missing required fields or file' }, { status: 400 })
    }

    const supabase = createClient()

    const { data: book_data, error: book_error } = await supabase
      .from('books')
      .insert([{ book_name, author, publisher, publication_date, category_id: category }])
      .select()
      .single()

    if (book_error) {
      return Response.json({ error: `book table :${book_error.message}` }, { status: 500 })
    }

    const { error: uploadError } = await supabase.storage
      .from('knowledge')
      .upload(`books/cover_img/${book_data.id}.jpg`, file, {
        upsert: true
      })

    if (uploadError) {
      return Response.json({ error: `storage :${uploadError.message}` }, { status: 500 })
    }

    const { data: book_detail_data, error: book_detail_error } = await supabase
      .from('book_details')
      .insert([
        {
          book_id: book_data.id,
          description,
          table_of_contents,
          cover_image_url: `${process.env.NEXT_PUBLIC_SSE}/knowledge/books/cover_img/${book_data.id}.jpg`
        }
      ])
      .select()

    if (book_detail_error) {
      return Response.json({ error: `book_detail table :${book_detail_error.message}` }, { status: 500 })
    }

    return Response.json({ book_data, book_detail_data }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
