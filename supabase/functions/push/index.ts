import { createClient } from "npm:@supabase/supabase-js@2";
import { JWT } from "npm:google-auth-library@9";

interface Message {
  chat_room_id: string;
  content: string;
  created_at: string;
  id: string;
  image_url: string | null;
  is_read: boolean;
  receiver_id: string | null;
  user_id: string;
}

interface WebhookPayload {
  type: "INSERT";
  table: string;
  record: Message;
  schema: "public";
}

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  const payload: WebhookPayload = await req.json();

  const { data: receiver } = await supabase
    .from("users")
    .select("fcm_token")
    .eq("id", payload.record.receiver_id)
    .single();

  const { data: sender } = await supabase
    .from("users")
    .select("nickname, profile_picture")
    .eq("id", payload.record.user_id)
    .single();

  const fcmToken = receiver?.fcm_token;
  const nickname = sender?.nickname ?? "알 수 없는 사용자";
  const profilePicture = sender?.profile_picture ?? "";

  if (!fcmToken) {
    console.error("FCM 토큰이 존재하지 않습니다", payload.record.receiver_id);
    return new Response("FCM 토큰이 존재하지 않습니다", { status: 400 });
  }

  const serviceAccount = JSON.parse(Deno.env.get("FCM_SERVICE_ACCOUNT")!);
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

  const getAccessToken = async (): Promise<string> => {
    const jwtClient = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
    });
    const tokens = await jwtClient.authorize();
    return tokens.access_token!;
  };

  const accessToken = await getAccessToken();

  const response = await fetch(
    `https://fcm.googleapis.com/v1/projects/${serviceAccount.project_id}/messages:send`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        message: {
          token: fcmToken,
          data: {
            title: nickname,
            body: payload.record.content,
            image: profilePicture,
          },
        },
      }),
    },
  ).catch((e) => console.error("메시지 전송 에러 발생: ", e));

  const resData = await response?.json();
  if (!response || response.status < 200 || response.status > 299) {
    throw resData || "알 수 없는 에러";
  }

  return new Response(JSON.stringify(resData), {
    headers: { "Content-Type": "application/json" },
  });
});
