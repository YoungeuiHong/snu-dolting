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

  // 현재 로그인한 사용자가 참여한 채팅방 정보들 가져오기
  const { data: chatRooms, error: chatRoomsError } = await supabase
    .from("chat_rooms")
    .select("id, user1_id, user2_id")
    .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`);

  if (chatRoomsError) {
    throw new Error("채팅방 목록 조회에 실패했습니다");
  }

  if (!chatRooms || chatRooms.length === 0) return [];

  // 각각의 채팅방에 대해 상대방 정보, 가장 최근 메세지 정보 조회
  const [otherUsersResult, recentMessagesResult] = await Promise.all([
    // 상대방 정보
    supabase
      .from("users")
      .select("id, nickname, profile_picture")
      .in(
        "id",
        chatRooms.map((room) =>
          room.user1_id === user.id ? room.user2_id : room.user1_id,
        ),
      ),

    // 최근 메시지 가져오기
    supabase
      .from("messages")
      .select("chat_room_id, content, created_at")
      .in(
        "chat_room_id",
        chatRooms.map((room) => room.id),
      )
      .order("created_at", { ascending: false }),
  ]);

  const { data: otherUsers } = otherUsersResult;
  const { data: recentMessages } = recentMessagesResult;

  // 각 채팅방별 읽지 않은 메시지 개수 조회
  const { data: unreadCounts } = await supabase.rpc(
    "get_unread_message_counts",
    {
      user_id: user.id,
    },
  );

  // 채팅방 정보 합쳐서 반환
  return chatRooms.map((room) => {
    const otherUserId =
      room.user1_id === user.id ? room.user2_id : room.user1_id;

    const otherUser = otherUsers?.find((user) => user.id === otherUserId);
    const unreadCount =
      unreadCounts?.find((count) => count.chat_room_id === room.id)
        ?.unread_count || 0;
    const recentMessage = recentMessages?.find(
      (message) => message.chat_room_id === room.id,
    );

    return {
      ...room,
      otherUser: otherUser
        ? {
            nickname: otherUser.nickname,
            profile_picture: otherUser.profile_picture,
          }
        : null,
      unreadCount,
      recentMessage: recentMessage || null,
    };
  });
};
