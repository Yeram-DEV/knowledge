export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      book_category: {
        Row: {
          description: string
          id: string
        }
        Insert: {
          description: string
          id: string
        }
        Update: {
          description?: string
          id?: string
        }
        Relationships: []
      }
      book_details: {
        Row: {
          book_id: number
          cover_image_url: string
          created_at: string
          description: string | null
          id: number
          table_of_contents: string | null
          updated_at: string
        }
        Insert: {
          book_id: number
          cover_image_url: string
          created_at?: string
          description?: string | null
          id?: number
          table_of_contents?: string | null
          updated_at?: string
        }
        Update: {
          book_id?: number
          cover_image_url?: string
          created_at?: string
          description?: string | null
          id?: number
          table_of_contents?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'book_details_book_id_fkey'
            columns: ['book_id']
            isOneToOne: false
            referencedRelation: 'books'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'book_details_book_id_fkey'
            columns: ['book_id']
            isOneToOne: false
            referencedRelation: 'new_books'
            referencedColumns: ['book_id']
          },
          {
            foreignKeyName: 'book_details_book_id_fkey'
            columns: ['book_id']
            isOneToOne: false
            referencedRelation: 'popular_books'
            referencedColumns: ['book_id']
          }
        ]
      }
      books: {
        Row: {
          author: string
          book_name: string
          category_id: string | null
          created_at: string
          id: number
          publication_date: string | null
          publisher: string
          updated_at: string
        }
        Insert: {
          author: string
          book_name: string
          category_id?: string | null
          created_at?: string
          id?: number
          publication_date?: string | null
          publisher: string
          updated_at?: string
        }
        Update: {
          author?: string
          book_name?: string
          category_id?: string | null
          created_at?: string
          id?: number
          publication_date?: string | null
          publisher?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'FK_46f5b35b90175a660f99810bc97'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'book_category'
            referencedColumns: ['id']
          }
        ]
      }
      events: {
        Row: {
          content: string | null
          created_at: string | null
          event_end_date: string
          event_id: number
          event_name: string
          event_start_date: string
          is_active: boolean | null
          summary: string | null
          thumbnail_url: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          event_end_date: string
          event_id?: number
          event_name: string
          event_start_date: string
          is_active?: boolean | null
          summary?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          event_end_date?: string
          event_id?: number
          event_name?: string
          event_start_date?: string
          is_active?: boolean | null
          summary?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      likes: {
        Row: {
          book_id: number | null
          created_at: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          book_id?: number | null
          created_at?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          book_id?: number | null
          created_at?: string | null
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'likes_book_id_fkey'
            columns: ['book_id']
            isOneToOne: false
            referencedRelation: 'books'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'likes_book_id_fkey'
            columns: ['book_id']
            isOneToOne: false
            referencedRelation: 'new_books'
            referencedColumns: ['book_id']
          },
          {
            foreignKeyName: 'likes_book_id_fkey'
            columns: ['book_id']
            isOneToOne: false
            referencedRelation: 'popular_books'
            referencedColumns: ['book_id']
          },
          {
            foreignKeyName: 'likes_user_id_fkey1'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      notice: {
        Row: {
          author_id: string | null
          content: string | null
          created_at: string | null
          id: number
          is_important: boolean | null
          is_using: boolean | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: never
          is_important?: boolean | null
          is_using?: boolean | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: never
          is_important?: boolean | null
          is_using?: boolean | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'notice_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      notifications: {
        Row: {
          body: string
          created_at: string | null
          id: number
          is_read: boolean
          token_id: number
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string | null
          id?: number
          is_read?: boolean
          token_id: number
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string | null
          id?: number
          is_read?: boolean
          token_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'notifications_token_id_fkey'
            columns: ['token_id']
            isOneToOne: false
            referencedRelation: 'token'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'notifications_user_id_fkey1'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      profiles: {
        Row: {
          email: string | null
          id: string
          phone: string | null
          raw_app_meta_data: Json | null
          raw_user_meta_data: Json | null
        }
        Insert: {
          email?: string | null
          id: string
          phone?: string | null
          raw_app_meta_data?: Json | null
          raw_user_meta_data?: Json | null
        }
        Update: {
          email?: string | null
          id?: string
          phone?: string | null
          raw_app_meta_data?: Json | null
          raw_user_meta_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      purchase_requests: {
        Row: {
          approval_status: boolean
          approver: string | null
          created_at: string | null
          id: number
          inspection_approval_status: boolean
          inspector: string | null
          purchase_link: string
          purpose: string
          request_date: string
          status: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          approval_status?: boolean
          approver?: string | null
          created_at?: string | null
          id?: number
          inspection_approval_status?: boolean
          inspector?: string | null
          purchase_link: string
          purpose: string
          request_date?: string
          status?: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          approval_status?: boolean
          approver?: string | null
          created_at?: string | null
          id?: number
          inspection_approval_status?: boolean
          inspector?: string | null
          purchase_link?: string
          purpose?: string
          request_date?: string
          status?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'purchase_requests_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      rentals: {
        Row: {
          book_id: number | null
          created_at: string | null
          due_date: string
          id: number
          rental_date: string
          return_date: string | null
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          book_id?: number | null
          created_at?: string | null
          due_date: string
          id?: number
          rental_date: string
          return_date?: string | null
          status: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          book_id?: number | null
          created_at?: string | null
          due_date?: string
          id?: number
          rental_date?: string
          return_date?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'rentals_book_id_fkey'
            columns: ['book_id']
            isOneToOne: false
            referencedRelation: 'books'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'rentals_book_id_fkey'
            columns: ['book_id']
            isOneToOne: false
            referencedRelation: 'new_books'
            referencedColumns: ['book_id']
          },
          {
            foreignKeyName: 'rentals_book_id_fkey'
            columns: ['book_id']
            isOneToOne: false
            referencedRelation: 'popular_books'
            referencedColumns: ['book_id']
          },
          {
            foreignKeyName: 'rentals_user_id_fkey1'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      returns: {
        Row: {
          book_id: number
          created_at: string | null
          id: number
          return_date: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          book_id: number
          created_at?: string | null
          id?: number
          return_date: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          book_id?: number
          created_at?: string | null
          id?: number
          return_date?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'returns_book_id_fkey'
            columns: ['book_id']
            isOneToOne: false
            referencedRelation: 'books'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'returns_book_id_fkey'
            columns: ['book_id']
            isOneToOne: false
            referencedRelation: 'new_books'
            referencedColumns: ['book_id']
          },
          {
            foreignKeyName: 'returns_book_id_fkey'
            columns: ['book_id']
            isOneToOne: false
            referencedRelation: 'popular_books'
            referencedColumns: ['book_id']
          },
          {
            foreignKeyName: 'returns_user_id_fkey1'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      reviews: {
        Row: {
          book_id: number
          created_at: string | null
          id: number
          rating: number
          review_text: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          book_id: number
          created_at?: string | null
          id?: number
          rating: number
          review_text?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          book_id?: number
          created_at?: string | null
          id?: number
          rating?: number
          review_text?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'fk_book'
            columns: ['book_id']
            isOneToOne: false
            referencedRelation: 'books'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'fk_book'
            columns: ['book_id']
            isOneToOne: false
            referencedRelation: 'new_books'
            referencedColumns: ['book_id']
          },
          {
            foreignKeyName: 'fk_book'
            columns: ['book_id']
            isOneToOne: false
            referencedRelation: 'popular_books'
            referencedColumns: ['book_id']
          },
          {
            foreignKeyName: 'reviews_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      token: {
        Row: {
          created_at: string | null
          device: string
          fcm_token: string
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device?: string
          fcm_token: string
          id?: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          device?: string
          fcm_token?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'token_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'token_user_id_fkey1'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      waitlist: {
        Row: {
          book_id: number | null
          created_at: string | null
          id: number
          request_date: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          book_id?: number | null
          created_at?: string | null
          id?: number
          request_date?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          book_id?: number | null
          created_at?: string | null
          id?: number
          request_date?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'waitlist_book_id_fkey'
            columns: ['book_id']
            isOneToOne: false
            referencedRelation: 'books'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'waitlist_book_id_fkey'
            columns: ['book_id']
            isOneToOne: false
            referencedRelation: 'new_books'
            referencedColumns: ['book_id']
          },
          {
            foreignKeyName: 'waitlist_book_id_fkey'
            columns: ['book_id']
            isOneToOne: false
            referencedRelation: 'popular_books'
            referencedColumns: ['book_id']
          },
          {
            foreignKeyName: 'waitlist_user_id_fkey1'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      new_books: {
        Row: {
          author: string | null
          book_id: number | null
          book_name: string | null
          category_description: string | null
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          publication_date: string | null
          publisher: string | null
          table_of_contents: string | null
        }
        Relationships: []
      }
      popular_books: {
        Row: {
          author: string | null
          book_id: number | null
          book_name: string | null
          category_description: string | null
          cover_image_url: string | null
          like_count: number | null
          popularity_score: number | null
          publication_date: string | null
          publisher: string | null
          rank: number | null
          total_rentals: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
