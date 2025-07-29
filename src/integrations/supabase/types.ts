export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      favorites: {
        Row: {
          created_at: string | null
          id: string
          property_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          property_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          property_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      financing_requests: {
        Row: {
          assigned_agent: string | null
          available_savings: number
          comments: string | null
          created_at: string | null
          email: string
          employment_type: string
          id: string
          monthly_income: number
          name: string
          phone: string
          property_value: number
          requested_loan_amount: number
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assigned_agent?: string | null
          available_savings: number
          comments?: string | null
          created_at?: string | null
          email: string
          employment_type: string
          id?: string
          monthly_income: number
          name: string
          phone: string
          property_value: number
          requested_loan_amount: number
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_agent?: string | null
          available_savings?: number
          comments?: string | null
          created_at?: string | null
          email?: string
          employment_type?: string
          id?: string
          monthly_income?: number
          name?: string
          phone?: string
          property_value?: number
          requested_loan_amount?: number
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financing_requests_assigned_agent_fkey"
            columns: ["assigned_agent"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          image_url: string | null
          is_read: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_read?: boolean | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      office_stats: {
        Row: {
          created_at: string | null
          id: string
          leads_captured: number | null
          month_year: string
          monthly_visits: number | null
          office_name: string
          top_properties: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          leads_captured?: number | null
          month_year: string
          monthly_visits?: number | null
          office_name: string
          top_properties?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          leads_captured?: number | null
          month_year?: string
          monthly_visits?: number | null
          office_name?: string
          top_properties?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          is_premium: boolean | null
          is_vip: boolean | null
          name: string | null
          phone: string | null
          premium_expiry: string | null
          referral_code: string | null
          referred_by: string | null
          registration_date: string | null
          total_referrals: number | null
          updated_at: string | null
          user_id: string
          user_type: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_premium?: boolean | null
          is_vip?: boolean | null
          name?: string | null
          phone?: string | null
          premium_expiry?: string | null
          referral_code?: string | null
          referred_by?: string | null
          registration_date?: string | null
          total_referrals?: number | null
          updated_at?: string | null
          user_id: string
          user_type?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_premium?: boolean | null
          is_vip?: boolean | null
          name?: string | null
          phone?: string | null
          premium_expiry?: string | null
          referral_code?: string | null
          referred_by?: string | null
          registration_date?: string | null
          total_referrals?: number | null
          updated_at?: string | null
          user_id?: string
          user_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      properties: {
        Row: {
          area: number
          bathrooms: number
          bedrooms: number
          city: string
          coordinates: Json | null
          created_at: string | null
          description: string | null
          energy_rating: string | null
          exclusive_access: boolean | null
          features: string[] | null
          id: string
          image_url: string | null
          images: string[] | null
          investment_risk: string | null
          is_exclusive: boolean | null
          is_new: boolean | null
          is_reserved: boolean | null
          location: string
          luxury_features: string[] | null
          monthly_rent: number | null
          neighborhood: string | null
          personal_agent: string | null
          postal_code: string | null
          price: number
          property_type: string | null
          province: string
          rental_yield: number | null
          roi: number | null
          title: string
          updated_at: string | null
          year_built: number | null
        }
        Insert: {
          area: number
          bathrooms: number
          bedrooms: number
          city: string
          coordinates?: Json | null
          created_at?: string | null
          description?: string | null
          energy_rating?: string | null
          exclusive_access?: boolean | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          investment_risk?: string | null
          is_exclusive?: boolean | null
          is_new?: boolean | null
          is_reserved?: boolean | null
          location: string
          luxury_features?: string[] | null
          monthly_rent?: number | null
          neighborhood?: string | null
          personal_agent?: string | null
          postal_code?: string | null
          price: number
          property_type?: string | null
          province: string
          rental_yield?: number | null
          roi?: number | null
          title: string
          updated_at?: string | null
          year_built?: number | null
        }
        Update: {
          area?: number
          bathrooms?: number
          bedrooms?: number
          city?: string
          coordinates?: Json | null
          created_at?: string | null
          description?: string | null
          energy_rating?: string | null
          exclusive_access?: boolean | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          investment_risk?: string | null
          is_exclusive?: boolean | null
          is_new?: boolean | null
          is_reserved?: boolean | null
          location?: string
          luxury_features?: string[] | null
          monthly_rent?: number | null
          neighborhood?: string | null
          personal_agent?: string | null
          postal_code?: string | null
          price?: number
          property_type?: string | null
          province?: string
          rental_yield?: number | null
          roi?: number | null
          title?: string
          updated_at?: string | null
          year_built?: number | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          confirmed_at: string | null
          created_at: string | null
          id: string
          referred_user_id: string
          referrer_id: string
          reward_amount: number | null
          status: string | null
        }
        Insert: {
          confirmed_at?: string | null
          created_at?: string | null
          id?: string
          referred_user_id: string
          referrer_id: string
          reward_amount?: number | null
          status?: string | null
        }
        Update: {
          confirmed_at?: string | null
          created_at?: string | null
          id?: string
          referred_user_id?: string
          referrer_id?: string
          reward_amount?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_user_id_fkey"
            columns: ["referred_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      visits: {
        Row: {
          created_at: string | null
          date: string
          id: string
          notes: string | null
          property_id: string
          status: string | null
          time: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          notes?: string | null
          property_id: string
          status?: string | null
          time: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          property_id?: string
          status?: string | null
          time?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "visits_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
