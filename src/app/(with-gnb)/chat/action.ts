"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const getUserChatRoomsWithMessages = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: chatRooms, error: chatRoomsError } = await supabase
    .from("chat_rooms")
    .select(
      `
      id,
      user1_id,
      user2_id
    `,
    )
    .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`);

  if (chatRoomsError) {
    throw new Error("채팅방 목록 조회에 실패했습니다");
  }

  if (chatRooms && chatRooms.length === 0) return [];

  // 각 채팅방의 상대방 정보 가져오기
  const enrichedChatRooms = await Promise.all(
    chatRooms.map(async (room) => {
      const otherUserId =
        room.user1_id === user.id ? room.user2_id : room.user1_id;

      // 상대방 닉네임과 프로필 이미지 가져오기
      const { data: otherUser, error: otherUserError } = await supabase
        .from("users")
        .select("nickname, profile_picture")
        .eq("id", otherUserId)
        .single();

      if (otherUserError) {
        console.error(
          "채팅방 상대 정보 조회에 실패했습니다:",
          otherUserError.message,
        );
        return null;
      }

      // 읽지 않은 메시지 개수 계산
      const { count: unreadCount, error: unreadError } = await supabase
        .from("messages")
        .select("*", { count: "exact" })
        .eq("chat_room_id", room.id)
        .eq("user_id", otherUserId) // 상대방이 보낸 메시지만
        .eq("is_read", false); // 읽지 않은 메시지 필터

      if (unreadError) {
        console.error(
          "읽지 않은 메시지 개수 조회에 실패했습니다:",
          unreadError.message,
        );
        return null;
      }

      return {
        ...room,
        otherUser: {
          nickname: otherUser.nickname,
          profile_picture: otherUser.profile_picture,
        },
        unreadCount: unreadCount || 0,
      };
    }),
  );

  // 최근 메시지 가져오기
  const chatRoomIds = enrichedChatRooms
    .map((room) => room?.id)
    .filter((id) => !!id);

  const { data: recentMessages, error: messagesError } = await supabase
    .from("messages")
    .select(
      `
      chat_room_id,
      id,
      content,
      created_at
    `,
    )
    .in("chat_room_id", chatRoomIds)
    .order("created_at", { ascending: false });

  if (messagesError) {
    console.error("최근 메세지 조회에 실패했습니다: ", messagesError.message);
  }

  return enrichedChatRooms
    .map((room) => {
      if (!room) return null;

      const recentMessage = recentMessages?.find(
        (message) => message.chat_room_id === room.id,
      );

      return {
        ...room,
        recentMessage: recentMessage || null,
      };
    })
    .filter((room) => room !== null && room.recentMessage !== null);
};
