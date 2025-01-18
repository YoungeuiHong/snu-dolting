import Link from "next/link";
import { getUserChatRoomsWithMessages } from "@/app/(with-gnb)/chat/action";
import {
  chatContainer,
  chatRoomContainer,
  createdAt,
  nickname,
  noResultContainer,
  noResultMessage,
  recentMessage,
  textBottomContainer,
  textContainer,
  textTopContainer,
  unreadCount,
} from "@/app/(with-gnb)/chat/page.css";
import { ImageWithFallback } from "@/components/image";
import { formatChatDate } from "@/utils/date";

export default async function ChatRoomsPage() {
  const chatRooms = await getUserChatRoomsWithMessages();

  return (
    <div className={chatContainer}>
      {chatRooms.length === 0 ? (
        <div className={noResultContainer}>
          <p className={noResultMessage}>채팅방이 없습니다</p>
        </div>
      ) : (
        <>
          {chatRooms
            .filter((room) => room !== null)
            .map((room) => {
              return (
                <Link
                  key={room.id}
                  href={`/chat/${room.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className={chatRoomContainer}>
                    <ImageWithFallback
                      src={room.otherUser?.profile_picture || null}
                      alt="프로필"
                      width={40}
                      height={40}
                      style={{ borderRadius: "4px" }}
                    />
                    <div className={textContainer}>
                      <div className={textTopContainer}>
                        <span className={nickname}>
                          {room.otherUser?.nickname}
                        </span>
                        <span className={createdAt}>
                          {room.recentMessage?.created_at
                            ? formatChatDate(room.recentMessage?.created_at)
                            : ""}
                        </span>
                      </div>
                      <div className={textBottomContainer}>
                        <span className={recentMessage}>
                          {room.recentMessage?.content || "사진을 보냈습니다"}
                        </span>
                        {room.unreadCount > 0 && (
                          <span className={unreadCount}>
                            {room.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </>
      )}
    </div>
  );
}
