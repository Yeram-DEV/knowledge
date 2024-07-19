export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
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
      knowledge_category: {
        Row: {
          category_name: string
          category_summary: string
          created_at: string | null
          id: number
          updated_at: string | null
        }
        Insert: {
          category_name: string
          category_summary: string
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
        Update: {
          category_name?: string
          category_summary?: string
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      knowledge_video: {
        Row: {
          contents: string | null
          created_at: string | null
          external_link: string | null
          id: number
          knowledge_category_id: number
          thumbnail: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          contents?: string | null
          created_at?: string | null
          external_link?: string | null
          id?: number
          knowledge_category_id: number
          thumbnail?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          contents?: string | null
          created_at?: string | null
          external_link?: string | null
          id?: number
          knowledge_category_id?: number
          thumbnail?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'knowledge_video_knowledge_category_id_fkey'
            columns: ['knowledge_category_id']
            isOneToOne: false
            referencedRelation: 'knowledge_category'
            referencedColumns: ['id']
          }
        ]
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
            foreignKeyName: 'likes_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
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
            foreignKeyName: 'notifications_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
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
            foreignKeyName: 'rentals_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
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
            foreignKeyName: 'returns_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
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
          user_name: string | null
          user_profile_img: string | null
        }
        Insert: {
          book_id: number
          created_at?: string | null
          id?: number
          rating: number
          review_text?: string | null
          updated_at?: string | null
          user_id: string
          user_name?: string | null
          user_profile_img?: string | null
        }
        Update: {
          book_id?: number
          created_at?: string | null
          id?: number
          rating?: number
          review_text?: string | null
          updated_at?: string | null
          user_id?: string
          user_name?: string | null
          user_profile_img?: string | null
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
            foreignKeyName: 'fk_user'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
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
            foreignKeyName: 'waitlist_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          }
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: 's3_multipart_uploads_bucket_id_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          }
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: 's3_multipart_uploads_parts_bucket_id_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 's3_multipart_uploads_parts_upload_id_fkey'
            columns: ['upload_id']
            isOneToOne: false
            referencedRelation: 's3_multipart_uploads'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
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
