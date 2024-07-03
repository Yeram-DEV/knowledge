'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function createMeta(formData: FormData) {
  const supabase = createClient()

  const fullName = formData.get('fullName')
  const position = formData.get('position')
  const team = formData.get('team')

  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      position,
      team,
      role: 'USER'
    }
  })

  if (error) {
    console.error('Error updating user metadata:', error)
  } else {
    redirect('/')
  }
}
