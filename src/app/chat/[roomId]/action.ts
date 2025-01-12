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
  imageUrl: string | null;
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
    console.error("채팅방 정보 조회 실패:", chatRoomError.message);
    throw new Error("채팅방 조회에 실패했습니다");
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
    console.error("채팅방 상대 정보 조회 실패:", otherUserError.message);
    throw new Error("채팅방 조회에 실패했습니다");
  }

  // 읽지 않은 메시지 읽음 처리
  const { error: updateError } = await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("chat_room_id", roomId)
    .eq("user_id", otherId)
    .eq("is_read", false);

  if (updateError) {
    console.error("메세지 읽음 처리에 실패: ", updateError.message);
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
    .select("id, content, image_url, created_at, user_id, is_read")
    .eq("chat_room_id", roomId)
    .order("created_at", { ascending: false });

  if (messagesError) {
    console.error("채팅방 메세지 조회 실패: ", messagesError.message);
    throw new Error("채팅방 조회에 실패했습니다");
  }

  // 클라이언트로 반환할 데이터 가공
  return messages.map((message) => ({
    id: message.id,
    content: message.content,
    imageUrl: message.image_url,
    createdAt: message.created_at,
    isRead: message.is_read,
    sender: message.user_id === userId ? Sender.Me : Sender.Other,
  }));
};

// 메세지 전송하기
export const sendMessage = async ({
  roomId,
  userId,
  content,
  imageUrl = null,
}: {
  roomId: string;
  userId: string;
  content: string;
  imageUrl?: string | null;
}) => {
  const supabase = await createClient();

  const { data: chatRoom, error: chatRoomError } = await supabase
    .from("chat_rooms")
    .select("user1_id, user2_id")
    .eq("id", roomId)
    .single();

  if (chatRoomError) {
    console.error("메세지 전송 실패:", chatRoomError.message);
    throw new Error("메세지 전송에 실패했습니다");
  }

  const otherId =
    chatRoom.user1_id === userId ? chatRoom.user2_id : chatRoom.user1_id;

  const { error } = await supabase.from("messages").insert({
    chat_room_id: roomId,
    user_id: userId,
    content: content || "",
    image_url: imageUrl,
    receiver_id: otherId,
  });

  if (error) {
    console.error("메시지 전송 실패:", error.message);
    throw new Error("메시지 전송에 실패했습니다");
  }

  return { success: true };
};
