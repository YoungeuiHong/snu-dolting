"use client";
import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchMessages,
  markMessagesAsRead,
  MessageDto,
} from "@/app/chat/[roomId]/action";
import { User } from "@supabase/auth-js";
import { Sender } from "@/types/chat";
import { createClient } from "@/utils/supabase/client";
import { ImageWithFallback } from "@/components/image";
import { SvgIconButton } from "@/components/button";
import { formatLocalTime } from "@/utils/date";
import {
  chatContainer,
  chatHeader,
  input,
  inputContainer,
  messageContainer,
  messageDate,
  messageInfo,
  messageMe,
  messageMeWrapper,
  messageOther,
  messageOtherWrapper,
  messageTime,
  nickname,
  unreadMessage,
} from "./page.css";

export default function ChatRoomPage({
  params: rawParams,
}: {
  params: Promise<{
    roomId: string;
  }>;
}) {
  const router = useRouter();
  const params = use(rawParams);
  const roomId = params.roomId;
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false); // 전송 중 상태 관리
  const [otherNickname, setOtherNickname] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");

  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const supabase = createClient();

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const fetchUserAndMessages = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);

      try {
        const serverMessages = await fetchMessages(roomId, user.id);
        setMessages(serverMessages);
        scrollToBottom();

        const { otherNickname, profilePicture } = await markMessagesAsRead(
          roomId,
          user.id,
        );
        setOtherNickname(otherNickname || "");
        setProfilePicture(profilePicture || "");
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserAndMessages();
  }, [roomId, router, supabase]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase.channel(`chat_room:${roomId}`);

    // 메시지 삽입 이벤트 구독
    channel.on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `chat_room_id=eq.${roomId}`,
      },
      (payload) => {
        const newMessage = payload.new;
        setMessages((prev) => [
          ...prev,
          {
            id: newMessage.id,
            content: newMessage.content,
            createdAt: newMessage.created_at,
            sender: newMessage.user_id === user?.id ? Sender.Me : Sender.Other,
            isRead: newMessage.is_read,
          },
        ]);
      },
    );

    // 메시지 읽음 상태 변경 이벤트 구독
    channel.on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "messages",
        filter: `chat_room_id=eq.${roomId}`,
      },
      (payload) => {
        const updatedMessage = payload.new;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === updatedMessage.id
              ? { ...msg, isRead: updatedMessage.is_read }
              : msg,
          ),
        );
      },
    );

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, supabase, user]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user || isSending) return;

    setIsSending(true);

    try {
      const { error } = await supabase.from("messages").insert({
        chat_room_id: roomId,
        user_id: user.id,
        content: newMessage.trim(),
      });

      if (error) {
        console.error(error);
      } else {
        setNewMessage("");
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    if (!isMobile) {
      if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
        e.preventDefault();
        sendMessage();
      } else if (e.key === "Enter" && (e.shiftKey || e.ctrlKey)) {
        return;
      }
    }
  };

  return (
    <div className={chatContainer}>
      <div className={chatHeader}>
        <SvgIconButton
          src="/icon/prev.svg"
          alt="이전"
          width={20}
          height={20}
          onClick={() => router.push("/chat")}
        />
        <ImageWithFallback
          src={profilePicture}
          alt="프로필 이미지"
          width={30}
          height={30}
          style={{ borderRadius: "50%" }}
        />
        <span className={nickname}>{otherNickname}</span>
      </div>

      <div ref={messageContainerRef} className={messageContainer}>
        {messages.map((msg, index) => {
          const showDate =
            index === 0 ||
            formatLocalTime(messages[index - 1].createdAt, "YYYY년 M월 D일") !==
              formatLocalTime(msg.createdAt, "YYYY년 M월 D일");

          return (
            <div key={msg.id}>
              {showDate && (
                <div className={messageDate}>
                  {formatLocalTime(msg.createdAt, "YYYY년 M월 D일")}
                </div>
              )}
              <div
                className={
                  msg.sender === Sender.Me
                    ? messageMeWrapper
                    : messageOtherWrapper
                }
              >
                {msg.sender === Sender.Me && (
                  <div className={messageInfo}>
                    {!msg.isRead && <span className={unreadMessage}>1</span>}
                    <span className={messageTime}>
                      {formatLocalTime(msg.createdAt, "A h:mm")}
                    </span>
                  </div>
                )}
                <div
                  className={
                    msg.sender === Sender.Me ? messageMe : messageOther
                  }
                >
                  {msg.content}
                </div>
                {msg.sender === Sender.Other && (
                  <span className={messageTime}>
                    {formatLocalTime(msg.createdAt, "A h:mm")}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className={inputContainer}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메세지 입력"
          className={input}
          style={{ height: "41px" }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "41px";
            const scrollHeight = target.scrollHeight;
            const maxHeight = 100;
            target.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
          }}
        />
        <SvgIconButton
          src="/icon/send.svg"
          alt="전송"
          width={18}
          height={18}
          onClick={sendMessage}
          style={{
            backgroundColor: "#1474FF",
            width: "41px",
            height: "41px",
            borderRadius: "41px",
            paddingLeft: "3px",
          }}
        />
      </div>
    </div>
  );
}
