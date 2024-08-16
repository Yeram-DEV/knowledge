import { addDays, format } from 'date-fns'
import { createClient } from '@/utils/supabase/client'
import { getChoseong } from 'es-hangul'

const supabase = createClient()

export async function getBook(bookId: number) {
  try {
    const { data } = await supabase
      .from('books')
      .select('*, book_details (*), book_category (*), rentals (*), waitlist (*), reviews (*)')
      .eq('id', bookId)
      .single()
    return data
  } catch (error) {
    throw new Error(error.response.data)
  }
}

export async function postPurchaseBook(params: {
  purchase_link: string
  title: string
  purpose: string
  isbn: number
}) {
  try {
    const { purchase_link, title, purpose, isbn } = params
    const {
      data: { user }
    } = await supabase.auth.getUser()

    const { error: fetchError } = await supabase
      .from('purchase_requests')
      .select('id')
      .eq('user_id', user.id)
      .gte('request_date', addDays(new Date(), -7).toISOString())

    if (fetchError) {
      return { success: false, message: '1주일 이내에 이미 신청한 기록이 있습니다.\n구매절차 내용을 확인해주세요' }
    }

    const { data, error: insertError } = await supabase.from('purchase_requests').insert([
      {
        purchase_link,
        title,
        purpose,
        user_id: user.id,
        isbn
      }
    ])

    if (insertError) {
      return { success: false, message: insertError.message }
    }

    return { success: true, data }
  } catch (error) {
    throw new Error(error.response.data)
  }
}

export async function searchBooks(searchQuery?: string) {
  try {
    const { data, error } = await supabase.from('books').select('*, book_details(*)').order('id', { ascending: false })

    if (error) {
      return { success: false, message: error.message }
    }

    const queryChoseong = getChoseong(searchQuery)
    const filteredData = data
      .filter((book) => {
        const bookChoseong = getChoseong(book.book_name)
        return bookChoseong.includes(queryChoseong)
      })
      .sort((a, b) => {
        const aChoseong = getChoseong(a.book_name)
        const bChoseong = getChoseong(b.book_name)
        const aExactMatch = a.book_name.includes(searchQuery)
        const bExactMatch = b.book_name.includes(searchQuery)
        if (aExactMatch && !bExactMatch) return -1
        if (!aExactMatch && bExactMatch) return 1
        return aChoseong.indexOf(queryChoseong) - bChoseong.indexOf(queryChoseong)
      })
      .slice(0, 5)
    return { success: true, result: filteredData }
  } catch (error) {
    throw new Error(error.response.data)
  }
}

export async function getLikedBooks(bookId: number) {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    const { data, error } = await supabase.from('likes').select('*').eq('user_id', user.id).eq('book_id', bookId)
    if (error) {
      return { success: false, message: error.message }
    }

    if (data.length > 0) {
      return { success: true, result: data }
    }
    return { success: false, message: null }
  } catch (error) {
    throw new Error(error.response.data)
  }
}

export async function updateLikeBook(bookId: number) {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    const { data: like, error: fetchError } = await supabase
      .from('likes')
      .select('*')
      .eq('user_id', user.id)
      .eq('book_id', bookId)
    if (fetchError) {
      return { success: false, message: fetchError.message }
    }

    if (like.length <= 0) {
      const { data, error } = await supabase.from('likes').insert({ user_id: user.id, book_id: bookId })
      if (error) {
        return { success: false, message: error.message }
      }
      return { success: true, result: data }
    } else {
      const { data, error } = await supabase.from('likes').delete().eq('user_id', user.id).eq('book_id', bookId)
      if (error) {
        return { success: false, message: error.message }
      }
      return { success: true, result: data }
    }
  } catch (error) {
    throw new Error(error.response.data)
  }
}

export async function createRent(bookId: number) {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    const { data: rentals, error: rentalError } = await supabase.from('rentals').select('*').eq('book_id', bookId)
    if (rentalError || rentals.length > 0) {
      return { success: false, message: '이미 대여중인 도서입니다' }
    }

    const rentalDate = format(new Date(), 'yyyy-MM-dd')
    const dueDate = format(addDays(new Date(), 14), 'yyyy-MM-dd')
    const { data, error } = await supabase
      .from('rentals')
      .insert([{ user_id: user.id, book_id: bookId, rental_date: rentalDate, due_date: dueDate, status: 'RENTED' }])

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, result: data }
  } catch (error) {
    throw new Error(error.response.data)
  }
}

export async function createReturn(book: any) {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    const { data: rentals, error: rentalError } = await supabase
      .from('rentals')
      .select('*')
      .eq('book_id', book.id)
      .eq('user_id', user.id)

    if (rentalError || rentals.length === 0) {
      return { success: false, message: '반납할 대여 기록이 없습니다.' }
    }

    const { error: deleteError } = await supabase.from('rentals').delete().eq('book_id', book.id).eq('user_id', user.id)

    if (deleteError) {
      return { success: false, message: deleteError.message }
    }

    const returnDate = format(new Date(), 'yyyy-MM-dd')
    const { data, error: returnLogError } = await supabase
      .from('returns')
      .insert([{ user_id: user.id, book_id: book.id, return_date: returnDate }])

    if (returnLogError) {
      return { success: false, message: returnLogError.message }
    }

    const { data: waitlist, error: waitlistError } = await supabase
      .from('waitlist')
      .select('*')
      .eq('book_id', book.id)
      .order('created_at', { ascending: true })
      .limit(1)

    if (waitlistError) {
      return { success: false, message: waitlistError.message }
    }

    if (waitlist && waitlist.length > 0) {
      const nextUser = waitlist[0]
      const rentalDate = format(new Date(), 'yyyy-MM-dd')
      const dueDate = format(addDays(new Date(), 14), 'yyyy-MM-dd') // 2-week rental period

      const { error: insertError } = await supabase
        .from('rentals')
        .insert([
          { user_id: nextUser.user_id, book_id: book.id, rental_date: rentalDate, due_date: dueDate, status: 'RENTED' }
        ])

      if (insertError) {
        return { success: false, message: insertError.message }
      }

      if (!insertError) {
        await supabase.from('waitlist').delete().eq('book_id', book.id).eq('user_id', nextUser.user_id)
        await insertNotification(nextUser, `대여 가능 알림: 대기 목록에서 ${book.book_name}이(가) 대여되었습니다.`)
      }
    }

    return { success: true, result: data }
  } catch (error) {
    throw new Error(error.response.data)
  }
}

export async function createWaitlist(bookId: number) {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    const { data: existingWaitlist, error: existingError } = await supabase
      .from('waitlist')
      .select('*')
      .eq('book_id', bookId)
      .eq('user_id', user.id)

    if (existingError) {
      return { success: false, message: existingError.message }
    }

    if (existingWaitlist && existingWaitlist.length > 0) {
      return { success: false, message: '이미 대기 목록에 있습니다.' }
    }

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ user_id: user.id, book_id: bookId, status: 'waiting' }])

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, result: data }
  } catch (error) {
    throw new Error(error.response.data)
  }
}

export async function deleteWaitlist(bookId: number) {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    const { error } = await supabase.from('waitlist').delete().eq('book_id', bookId).eq('user_id', user.id)
    if (error) {
      return { success: false, message: error.message }
    }

    const { data, error: rentalsError } = await supabase.from('rentals').select('*').eq('book_id', user.id)

    if (rentalsError) {
      return { success: false, message: rentalsError.message }
    }

    return { success: true, result: data }
  } catch (error) {
    throw new Error(error.response.data)
  }
}

export const insertNotification = async (target_user: any, message: string) => {
  const { data: tokens, error: tokenError } = await supabase
    .from('token')
    .select('id, fcm_token')
    .eq('user_id', target_user.user_id)

  if (tokenError) {
    return tokenError
  }

  if (tokens && tokens.length > 0) {
    for (const token of tokens) {
      const notification = {
        user_id: target_user.user_id,
        token_id: token.id,
        body: message
      }

      const { error } = await supabase.from('notifications').insert([notification])

      if (error) {
        return error
      }
    }
  } else {
    console.log('알림을 보낼 토큰이 없습니다.')
  }
}
