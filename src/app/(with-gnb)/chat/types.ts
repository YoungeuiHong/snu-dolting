export interface ChatRoom {
  id: string;
  otherUser: {
    nickname: string;
    profile_picture: string | null;
  } | null;
  unreadCount: number;
  recentMessage: {
    content: string;
    created_at: string;
  } | null;
}
