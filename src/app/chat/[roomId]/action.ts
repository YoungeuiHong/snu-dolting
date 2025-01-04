"use server";
import { createClient } from "@/utils/supabase/server";
import { Sender } from "@/types/chat";

type MarkMessagesAsReadResponse = {
  otherNickname: string | null;
  profilePicture: string | null;
};

export interface MessageDto {
  id: string;
  content: string;
  createdAt: string | null;
  isRead: boolean;
  sender: Sender;
}

type FetchMessagesResponse = MessageDto[];

// 메시지 읽음 처리 함수
export const markMessagesAsRead = async (
  roomId: string,
  userId: string,
): Promise<MarkMessagesAsReadResponse> => {
  const supabase = await createClient();

  const { data: chatRoom, error: chatRoomError } = await supabase
    .from("chat_rooms")
    .select("user1_id, user2_id")
    .eq("id", roomId)
    .single();

  if (chatRoomError) {
    console.error("Failed to fetch chat room:", chatRoomError.message);
    throw new Error("Failed to fetch chat room");
  }

  const otherId =
    chatRoom.user1_id === userId ? chatRoom.user2_id : chatRoom.user1_id;

  // 상대방 닉네임 가져오기
  const { data: otherUser, error: otherUserError } = await supabase
    .from("users")
    .select("nickname, profile_picture")
    .eq("id", otherId)
    .single();

  if (otherUserError) {
    console.error(
      "Failed to fetch other user's nickname:",
      otherUserError.message,
    );
    throw new Error("Failed to fetch other user's nickname");
  }

  // 읽지 않은 메시지 읽음 처리
  const { error: updateError } = await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("chat_room_id", roomId)
    .eq("user_id", otherId)
    .eq("is_read", false);

  if (updateError) {
    console.error("메세지 읽음 처리에 실패했습니다.", updateError.message);
    throw new Error("메세지 읽음 처리에 실패했습니다.");
  }

  return {
    otherNickname: otherUser.nickname,
    profilePicture: otherUser.profile_picture,
  };
};

// 메시지 가져오기 함수
export const fetchMessages = async (
  roomId: string,
  userId: string,
): Promise<FetchMessagesResponse> => {
  const supabase = await createClient();

  // 메시지 가져오기
  const { data: messages, error: messagesError } = await supabase
    .from("messages")
    .select("id, content, created_at, user_id, is_read")
    .eq("chat_room_id", roomId)
    .order("created_at", { ascending: true });

  if (messagesError) {
    console.error("Failed to fetch messages:", messagesError.message);
    throw new Error("Failed to fetch messages");
  }

  // 클라이언트로 반환할 데이터 가공
  return messages.map((message) => ({
    id: message.id,
    content: message.content,
    createdAt: message.created_at,
    isRead: message.is_read,
    sender: message.user_id === userId ? Sender.Me : Sender.Other,
  }));
};
