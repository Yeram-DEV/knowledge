'use server'

import { createClient } from '@/utils/supabase/server'

export async function createMeta(formData: FormData) {
  const supabase = createClient()

  const fullName = formData.get('fullName')
  const role = formData.get('role')
  const position = formData.get('position')
  const team = formData.get('team')

  const { data, error } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      role,
      position,
      team
    }
  })

  if (error) {
    console.error('Error updating user metadata:', error)
  } else {
    console.log('User metadata updated successfully:', data)
  }
}
