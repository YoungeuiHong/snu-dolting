"use server";
import { createClient } from "@/utils/supabase/server";
import { TablesInsert } from "@/types/supabase";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

type ScrapsInsert = TablesInsert<"scraps">;

export async function getUserByNickname(nickname: string): Promise<User> {
  if (!nickname) {
    throw new Error("프로필 조회에 실패했습니다");
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user || !user.email) {
    redirect("/login");
  }

  const { data: queriedUsers, error: queryError } = await supabase
    .from("users")
    .select(
      "appearance_description, birth_year, dating_style, daughter_count, has_children, height, ideal_type, inner_description, introduction, is_snu_graduate, job, location, nickname, photo_exchange_intent, profile_picture, religion, remarriage_intent, son_count, weight",
    )
    .eq("nickname", nickname);

  if (queryError) {
    console.error("프로필 조회 실패: ", queryError.message);
    throw new Error("프로필 조회에 실패했습니다");
  }

  if (!queriedUsers || queriedUsers.length === 0) {
    throw new Error("프로필 조회에 실패했습니다");
  }

  const userResult = queriedUsers[0];

  if (!userResult) {
    throw new Error("프로필 조회에 실패했습니다");
  }

  return userResult as User;
}

export async function getIsScrapped(nickname: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
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

  if (error) {
    console.error("스크랩 정보 조회 실패: ", error.message);
  }

  return data && data.length > 0;
}

export async function addScrap(nickname: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: targetUser, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("nickname", nickname)
    .single();

  if (userError || !targetUser) {
    console.error("스크랩 대상 조회 실패: ", userError?.message);
    throw new Error("스크랩에 실패했습니다");
  }

  const values: ScrapsInsert = {
    user_id: user.id,
    target_user_id: targetUser.id,
  };

  const { error } = await supabase.from("scraps").insert(values);

  if (error) {
    throw new Error("스크랩에 실패했습니다");
  }

  return true;
}

export async function removeScrap(nickname: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: targetUser, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("nickname", nickname)
    .single();

  if (userError || !targetUser) {
    console.error("스크랩 대상 조회 실패: ", userError?.message);
    throw new Error("스크랩 해제에 실패했습니다");
  }

  const { error } = await supabase
    .from("scraps")
    .delete()
    .eq("user_id", user.id)
    .eq("target_user_id", targetUser.id);

  if (error) {
    throw new Error("스크랩 해제에 실패했습니다");
  }

  return true;
}

export const findOrCreateChatRoom = async (nickname: string) => {
  const supabase = await createClient();

  // 현재 로그인된 사용자 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const user1Id = user.id;

  // 닉네임으로 상대방 사용자 ID 찾기
  const { data: targetUser, error: targetUserError } = await supabase
    .from("users")
    .select("id")
    .eq("nickname", nickname)
    .single();

  if (targetUserError) {
    console.error("상대방 정보 조회 실패: ", targetUserError.message);
    throw new Error("상대방 정보 조회에 실패했습니다");
  }

  const user2Id = targetUser.id;

  // 기존 채팅방 확인
  const { data, error } = await supabase
    .from("chat_rooms")
    .select("id")
    .or(
      `and(user1_id.eq.${user1Id},user2_id.eq.${user2Id}),and(user1_id.eq.${user2Id},user2_id.eq.${user1Id})`,
    )
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("채팅방 조회 실패: ", error.message);
    throw new Error("채팅방 이동에 실패했습니다");
  }

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

  if (createRoomError) {
    console.error("채팅방 생성 실패: ", createRoomError.message);
    throw new Error("채팅방 이동에 실패했습니다");
  }

  redirect(`/chat/${newRoom.id}`);
};
