export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      chat_rooms: {
        Row: {
          created_at: string | null;
          id: string;
          user1_id: string;
          user2_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          user1_id: string;
          user2_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          user1_id?: string;
          user2_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_rooms_user1_id_fkey";
            columns: ["user1_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_rooms_user2_id_fkey";
            columns: ["user2_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      messages: {
        Row: {
          chat_room_id: string;
          content: string;
          created_at: string;
          id: string;
          image_url: string | null;
          is_read: boolean;
          receiver_id: string | null;
          user_id: string;
        };
        Insert: {
          chat_room_id: string;
          content: string;
          created_at?: string;
          id?: string;
          image_url?: string | null;
          is_read?: boolean;
          receiver_id?: string | null;
          user_id: string;
        };
        Update: {
          chat_room_id?: string;
          content?: string;
          created_at?: string;
          id?: string;
          image_url?: string | null;
          is_read?: boolean;
          receiver_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "messages_chat_room_id_fkey";
            columns: ["chat_room_id"];
            isOneToOne: false;
            referencedRelation: "chat_rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_receiver_id_fkey";
            columns: ["receiver_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      scraps: {
        Row: {
          created_at: string | null;
          id: number;
          target_user_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          target_user_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          target_user_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "scraps_target_user_id_fkey";
            columns: ["target_user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "scraps_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          appearance_description: string | null;
          birth_year: number | null;
          created_at: string;
          dating_style: string | null;
          daughter_count: number | null;
          email: string;
          fcm_token: string | null;
          gender: string | null;
          has_children: boolean | null;
          has_custody: boolean | null;
          height: number | null;
          id: string;
          ideal_type: string | null;
          inner_description: string | null;
          introduction: string | null;
          is_profile_complete: boolean | null;
          is_snu_graduate: boolean | null;
          job: string | null;
          location: string | null;
          mbti: string | null;
          nickname: string | null;
          photo_exchange_intent: boolean | null;
          profile_picture: string | null;
          religion: string | null;
          remarriage_intent: boolean | null;
          son_count: number | null;
          updated_at: string | null;
          weight: number | null;
        };
        Insert: {
          appearance_description?: string | null;
          birth_year?: number | null;
          created_at?: string;
          dating_style?: string | null;
          daughter_count?: number | null;
          email: string;
          fcm_token?: string | null;
          gender?: string | null;
          has_children?: boolean | null;
          has_custody?: boolean | null;
          height?: number | null;
          id?: string;
          ideal_type?: string | null;
          inner_description?: string | null;
          introduction?: string | null;
          is_profile_complete?: boolean | null;
          is_snu_graduate?: boolean | null;
          job?: string | null;
          location?: string | null;
          mbti?: string | null;
          nickname?: string | null;
          photo_exchange_intent?: boolean | null;
          profile_picture?: string | null;
          religion?: string | null;
          remarriage_intent?: boolean | null;
          son_count?: number | null;
          updated_at?: string | null;
          weight?: number | null;
        };
        Update: {
          appearance_description?: string | null;
          birth_year?: number | null;
          created_at?: string;
          dating_style?: string | null;
          daughter_count?: number | null;
          email?: string;
          fcm_token?: string | null;
          gender?: string | null;
          has_children?: boolean | null;
          has_custody?: boolean | null;
          height?: number | null;
          id?: string;
          ideal_type?: string | null;
          inner_description?: string | null;
          introduction?: string | null;
          is_profile_complete?: boolean | null;
          is_snu_graduate?: boolean | null;
          job?: string | null;
          location?: string | null;
          mbti?: string | null;
          nickname?: string | null;
          photo_exchange_intent?: boolean | null;
          profile_picture?: string | null;
          religion?: string | null;
          remarriage_intent?: boolean | null;
          son_count?: number | null;
          updated_at?: string | null;
          weight?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_unread_message_counts: {
        Args: {
          my_id: string;
        };
        Returns: {
          chat_room_id: string;
          unread_count: number;
        }[];
      };
      init_chat_room: {
        Args: {
          room_id: string;
          current_user_id: string;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
