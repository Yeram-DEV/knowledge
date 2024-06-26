import { AdapterUser } from 'next-auth/adapters'

export interface User extends AdapterUser {
  address?: string // Add any additional fields you have
}
