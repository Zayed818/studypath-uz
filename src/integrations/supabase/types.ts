export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          budget_range: string | null
          city: string
          created_at: string
          current_education_level: string | null
          date_of_birth: string | null
          email: string
          english_score: string | null
          english_test: string | null
          first_name: string
          gender: string | null
          gpa: string | null
          id: string
          last_name: string
          nationality: string
          phone: string
          program_degree_level: string | null
          program_degree_name: string | null
          program_id: string
          program_name: string
          scholarship_interest: boolean | null
          status: string
          university_name: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          budget_range?: string | null
          city: string
          created_at?: string
          current_education_level?: string | null
          date_of_birth?: string | null
          email: string
          english_score?: string | null
          english_test?: string | null
          first_name: string
          gender?: string | null
          gpa?: string | null
          id?: string
          last_name: string
          nationality: string
          phone: string
          program_degree_level?: string | null
          program_degree_name?: string | null
          program_id: string
          program_name: string
          scholarship_interest?: boolean | null
          status?: string
          university_name: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          budget_range?: string | null
          city?: string
          created_at?: string
          current_education_level?: string | null
          date_of_birth?: string | null
          email?: string
          english_score?: string | null
          english_test?: string | null
          first_name?: string
          gender?: string | null
          gpa?: string | null
          id?: string
          last_name?: string
          nationality?: string
          phone?: string
          program_degree_level?: string | null
          program_degree_name?: string | null
          program_id?: string
          program_name?: string
          scholarship_interest?: boolean | null
          status?: string
          university_name?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      career_quiz_results: {
        Row: {
          created_at: string
          holland_scores: Json
          id: string
          top_careers: Json
          top_holland_codes: string
          user_id: string
        }
        Insert: {
          created_at?: string
          holland_scores: Json
          id?: string
          top_careers: Json
          top_holland_codes: string
          user_id: string
        }
        Update: {
          created_at?: string
          holland_scores?: Json
          id?: string
          top_careers?: Json
          top_holland_codes?: string
          user_id?: string
        }
        Relationships: []
      }
      help_requests: {
        Row: {
          agency_notes: string | null
          assigned_agency_id: string | null
          created_at: string | null
          current_education_level: string | null
          email: string
          full_name: string
          help_type: string
          id: string
          message: string
          phone: string | null
          preferred_contact_method: string | null
          program_id: string
          program_name: string
          resolved_at: string | null
          status: string | null
          university_name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          agency_notes?: string | null
          assigned_agency_id?: string | null
          created_at?: string | null
          current_education_level?: string | null
          email: string
          full_name: string
          help_type: string
          id?: string
          message: string
          phone?: string | null
          preferred_contact_method?: string | null
          program_id: string
          program_name: string
          resolved_at?: string | null
          status?: string | null
          university_name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          agency_notes?: string | null
          assigned_agency_id?: string | null
          created_at?: string | null
          current_education_level?: string | null
          email?: string
          full_name?: string
          help_type?: string
          id?: string
          message?: string
          phone?: string | null
          preferred_contact_method?: string | null
          program_id?: string
          program_name?: string
          resolved_at?: string | null
          status?: string | null
          university_name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      saved_programs: {
        Row: {
          country: string
          created_at: string | null
          degree: string
          duration: string | null
          field: string
          id: string
          notes: string | null
          program_id: string
          program_name: string
          tuition: string | null
          university_name: string
          user_id: string
        }
        Insert: {
          country: string
          created_at?: string | null
          degree: string
          duration?: string | null
          field: string
          id?: string
          notes?: string | null
          program_id: string
          program_name: string
          tuition?: string | null
          university_name: string
          user_id: string
        }
        Update: {
          country?: string
          created_at?: string | null
          degree?: string
          duration?: string | null
          field?: string
          id?: string
          notes?: string | null
          program_id?: string
          program_name?: string
          tuition?: string | null
          university_name?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      is_agency: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "agency" | "user"
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
    Enums: {
      app_role: ["admin", "agency", "user"],
    },
  },
} as const
