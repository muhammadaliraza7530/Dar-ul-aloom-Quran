export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          body: string
          created_at: string
          id: string
          title: string
        }
        Insert: {
          body?: string
          created_at?: string
          id?: string
          title: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      attendance_records: {
        Row: {
          class_date: string
          created_at: string
          enrollment_id: string | null
          id: string
          notes: string
          recorded_by: string | null
          status: string
          student_id: string
        }
        Insert: {
          class_date?: string
          created_at?: string
          enrollment_id?: string | null
          id?: string
          notes?: string
          recorded_by?: string | null
          status?: string
          student_id: string
        }
        Update: {
          class_date?: string
          created_at?: string
          enrollment_id?: string | null
          id?: string
          notes?: string
          recorded_by?: string | null
          status?: string
          student_id?: string
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          course_name: string
          course_slug: string
          created_at: string
          id: string
          schedule: string
          started_on: string | null
          status: string
          student_id: string
          teacher_name: string
        }
        Insert: {
          course_name: string
          course_slug?: string
          created_at?: string
          id?: string
          schedule?: string
          started_on?: string | null
          status?: string
          student_id: string
          teacher_name?: string
        }
        Update: {
          course_name?: string
          course_slug?: string
          created_at?: string
          id?: string
          schedule?: string
          started_on?: string | null
          status?: string
          student_id?: string
          teacher_name?: string
        }
        Relationships: []
      }
      fee_records: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          paid_on: string | null
          period: string
          status: string
          student_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          paid_on?: string | null
          period: string
          status?: string
          student_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          paid_on?: string | null
          period?: string
          status?: string
          student_id?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          country: string
          course: string
          created_at: string
          email: string
          full_name: string
          id: string
          kind: string
          message: string
          phone: string
          preferred_time: string
        }
        Insert: {
          country?: string
          course?: string
          created_at?: string
          email?: string
          full_name: string
          id?: string
          kind?: string
          message?: string
          phone?: string
          preferred_time?: string
        }
        Update: {
          country?: string
          course?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          kind?: string
          message?: string
          phone?: string
          preferred_time?: string
        }
        Relationships: []
      }
      lesson_records: {
        Row: {
          created_at: string
          enrollment_id: string | null
          homework: string
          id: string
          lesson_date: string
          lesson_number: number | null
          page_or_ayah: string
          recorded_by: string | null
          student_id: string
          subject: string
          surah_or_chapter: string
          teacher_note: string
          topic: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          enrollment_id?: string | null
          homework?: string
          id?: string
          lesson_date?: string
          lesson_number?: number | null
          page_or_ayah?: string
          recorded_by?: string | null
          student_id: string
          subject?: string
          surah_or_chapter?: string
          teacher_note?: string
          topic?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          enrollment_id?: string | null
          homework?: string
          id?: string
          lesson_date?: string
          lesson_number?: number | null
          page_or_ayah?: string
          recorded_by?: string | null
          student_id?: string
          subject?: string
          surah_or_chapter?: string
          teacher_note?: string
          topic?: string
          updated_at?: string
        }
        Relationships: []
      }
      materials: {
        Row: {
          created_at: string
          description: string
          id: string
          title: string
          url: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          title: string
          url?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          title?: string
          url?: string
        }
        Relationships: []
      }
      parent_student_links: {
        Row: {
          created_at: string
          id: string
          parent_id: string
          relation: string
          student_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          parent_id: string
          relation?: string
          student_id: string
        }
        Update: {
          created_at?: string
          id?: string
          parent_id?: string
          relation?: string
          student_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string
          admission_status: string
          avatar_url: string
          city: string
          country: string
          created_at: string
          date_of_birth: string | null
          email: string
          father_name: string
          full_name: string
          gender: string
          id: string
          phone: string
          student_id: string | null
          updated_at: string
        }
        Insert: {
          address?: string
          admission_status?: string
          avatar_url?: string
          city?: string
          country?: string
          created_at?: string
          date_of_birth?: string | null
          email?: string
          father_name?: string
          full_name?: string
          gender?: string
          id: string
          phone?: string
          student_id?: string | null
          updated_at?: string
        }
        Update: {
          address?: string
          admission_status?: string
          avatar_url?: string
          city?: string
          country?: string
          created_at?: string
          date_of_birth?: string | null
          email?: string
          father_name?: string
          full_name?: string
          gender?: string
          id?: string
          phone?: string
          student_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      progress_notes: {
        Row: {
          created_at: string
          id: string
          lesson_date: string
          note: string
          student_id: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          lesson_date?: string
          note?: string
          student_id: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          lesson_date?: string
          note?: string
          student_id?: string
          title?: string
        }
        Relationships: []
      }
      student_admissions: {
        Row: {
          address: string
          admin_notes: string
          city: string
          country: string
          course_interest: string
          created_at: string
          date_of_birth: string | null
          email: string
          father_name: string
          full_name: string
          gender: string
          guardian_name: string
          guardian_phone: string
          guardian_relation: string
          id: string
          mother_name: string
          phone: string
          preferred_time: string
          previous_education: string
          rejection_reason: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          submitted_at: string
          updated_at: string
          user_id: string
          whatsapp: string
        }
        Insert: {
          address?: string
          admin_notes?: string
          city?: string
          country?: string
          course_interest?: string
          created_at?: string
          date_of_birth?: string | null
          email?: string
          father_name?: string
          full_name: string
          gender?: string
          guardian_name?: string
          guardian_phone?: string
          guardian_relation?: string
          id?: string
          mother_name?: string
          phone?: string
          preferred_time?: string
          previous_education?: string
          rejection_reason?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          submitted_at?: string
          updated_at?: string
          user_id: string
          whatsapp?: string
        }
        Update: {
          address?: string
          admin_notes?: string
          city?: string
          country?: string
          course_interest?: string
          created_at?: string
          date_of_birth?: string | null
          email?: string
          father_name?: string
          full_name?: string
          gender?: string
          guardian_name?: string
          guardian_phone?: string
          guardian_relation?: string
          id?: string
          mother_name?: string
          phone?: string
          preferred_time?: string
          previous_education?: string
          rejection_reason?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          submitted_at?: string
          updated_at?: string
          user_id?: string
          whatsapp?: string
        }
        Relationships: []
      }
      teacher_remarks: {
        Row: {
          category: string
          created_at: string
          enrollment_id: string | null
          id: string
          rating: number | null
          recorded_by: string | null
          remark: string
          remark_date: string
          student_id: string
        }
        Insert: {
          category?: string
          created_at?: string
          enrollment_id?: string | null
          id?: string
          rating?: number | null
          recorded_by?: string | null
          remark: string
          remark_date?: string
          student_id: string
        }
        Update: {
          category?: string
          created_at?: string
          enrollment_id?: string | null
          id?: string
          rating?: number | null
          recorded_by?: string | null
          remark?: string
          remark_date?: string
          student_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
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
      approve_student: {
        Args: { p_user_id: string; p_admin_notes?: string }
        Returns: string
      }
      reject_student: {
        Args: { p_user_id: string; p_reason?: string }
        Returns: undefined
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "student" | "teacher" | "parent"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "student", "teacher", "parent"],
    },
  },
} as const
