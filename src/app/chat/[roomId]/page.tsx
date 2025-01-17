import { initChatRoom } from "@/app/chat/[roomId]/action";
import ChatRoomClientPage from "@/app/chat/[roomId]/client";

export default async function ChatRoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const roomId = (await params).roomId;

  const { userId, messages, otherNickname, profilePicture } =
    await initChatRoom(roomId);

  return (
    <div>
      <ChatRoomClientPage
        userId={userId}
        roomId={roomId}
        initialMessages={messages}
        otherNickname={otherNickname || ""}
        profilePicture={profilePicture || ""}
      />
    </div>
  );
}
