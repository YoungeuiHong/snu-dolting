"use server";
import { createClient } from "@/utils/supabase/server";
import { Sender } from "@/types/chat";
import { redirect } from "next/navigation";

export interface MessageDto {
  id: string;
  content: string;
  imageUrl: string | null;
  createdAt: string | null;
  isRead: boolean;
  sender: Sender;
}

interface ChatRoomInfo {
  userId: string;
  otherNickname: string | null;
  profilePicture: string | null;
  messages: MessageDto[];
}

// 메시지 읽음 처리 함수
export const markMessagesAsRead = async (roomId: string): Promise<string> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

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
    chatRoom.user1_id === user.id ? chatRoom.user2_id : chatRoom.user1_id;

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

  return otherId;
};

interface RpcChatRoomResponse {
  userId: string;
  otherUser: {
    otherNickname: string | null;
    profilePicture: string | null;
  };
  messages: {
    id: string;
    content: string;
    imageUrl: string | null;
    createdAt: string | null;
    isRead: boolean;
    sender: Sender;
  }[];
}

export const initChatRoom = async (roomId: string): Promise<ChatRoomInfo> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase.rpc("init_chat_room", {
    room_id: roomId,
    current_user_id: user.id,
  });

  if (!data || error) {
    console.error("init_chat_room RPC 호출 실패:", error?.message);
    throw new Error("채팅방 데이터를 불러오지 못했습니다");
  }

  const parsedData = data as unknown as RpcChatRoomResponse;

  return {
    userId: parsedData.userId,
    otherNickname: parsedData.otherUser.otherNickname,
    profilePicture: parsedData.otherUser.profilePicture,
    messages: (parsedData.messages ?? []).map((message) => ({
      id: message.id,
      content: message.content,
      imageUrl: message.imageUrl,
      createdAt: message.createdAt,
      isRead: message.isRead,
      sender: message.sender,
    })),
  };
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
