import { getUserChatRoomsWithMessages } from "@/app/(with-gnb)/chat/action";
import ChatRoomsClient from "./client";

export default async function ChatRoomsPage() {
  const initialChatRooms = await getUserChatRoomsWithMessages();

  return <ChatRoomsClient initialChatRooms={initialChatRooms} />;
}
