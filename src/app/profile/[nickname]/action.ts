"use server";
import { createClient } from "@/utils/supabase/server";
import { TablesInsert } from "@/types/supabase";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

type ScrapsInsert = TablesInsert<"scraps">;

export async function getUserByNickname(nickname: string): Promise<User> {
  if (!nickname) {
    throw new Error("닉네임은 필수 입력값입니다.");
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(`인증 상태 확인 중 오류 발생: ${authError.message}`);
  }

  if (!user || !user.email) {
    throw new Error("인증된 사용자가 아닙니다.");
  }

  const { data: queriedUsers, error: queryError } = await supabase
    .from("users")
    .select("*")
    .eq("nickname", nickname);

  if (queryError) {
    throw new Error(`조회 중 오류 발생: ${queryError.message}`);
  }

  if (!queriedUsers || queriedUsers.length === 0) {
    throw new Error(
      `닉네임 '${nickname}'에 해당하는 사용자를 찾을 수 없습니다.`,
    );
  }

  const userResult = queriedUsers[0];

  if (!userResult) {
    throw new Error("조회된 사용자 데이터가 유효하지 않습니다.");
  }

  return userResult as User;
}

export async function getIsScrapped(nickname: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("인증된 사용자가 아닙니다.");
  }

  const { data, error } = await supabase
    .from("scraps")
    .select(
      `
      target_user_id,
      users!scraps_target_user_id_fkey (nickname)
    `,
    )
    .eq("user_id", user.id)
    .eq("users.nickname", nickname);

  if (error) throw error;

  return data && data.length > 0;
}

export async function addScrap(targetUserId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("인증된 사용자가 아닙니다.");
  }

  const values: ScrapsInsert = {
    user_id: user.id,
    target_user_id: targetUserId,
  };
  const { error } = await supabase.from("scraps").insert(values);
  if (error) throw error;
  return true;
}

export async function removeScrap(targetUserId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("인증된 사용자가 아닙니다.");
  }

  const { error } = await supabase
    .from("scraps")
    .delete()
    .eq("user_id", user.id)
    .eq("target_user_id", targetUserId);

  if (error) throw error;
  return true;
}

export const findOrCreateChatRoom = async (nickname: string) => {
  const supabase = await createClient();

  // 현재 로그인된 사용자 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("인증된 사용자가 아닙니다.");
  }

  const user1Id = user.id;

  // 닉네임으로 상대방 사용자 ID 찾기
  const { data: targetUser, error: targetUserError } = await supabase
    .from("users")
    .select("id")
    .eq("nickname", nickname)
    .single();

  if (targetUserError) {
    if (targetUserError.code === "PGRST116") {
      throw new Error("해당 닉네임을 가진 사용자가 존재하지 않습니다.");
    } else {
      throw targetUserError;
    }
  }

  const user2Id = targetUser.id;

  // 기존 채팅방 확인
  const { data, error } = await supabase
    .from("chat_rooms")
    .select("id")
    .or(
      `and(user1_id.eq.${user1Id},user2_id.eq.${user2Id}),and(user1_id.eq.${user2Id},user1_id.eq.${user1Id})`,
    )
    .single();

  if (error && error.code !== "PGRST116") throw error; // PGRST116: no rows found
  if (data) {
    redirect(`/chat/${data.id}`);
    return;
  }

  // 새로운 채팅방 생성
  const { data: newRoom, error: createRoomError } = await supabase
    .from("chat_rooms")
    .insert({
      user1_id: user1Id,
      user2_id: user2Id,
    })
    .select("id")
    .single();

  if (createRoomError) throw createRoomError;

  redirect(`/chat/${newRoom.id}`);
};
