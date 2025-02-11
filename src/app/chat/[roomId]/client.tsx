"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  markMessagesAsRead,
  MessageDto,
  sendMessage as sendMessageAction,
} from "@/app/chat/[roomId]/action";
import { Sender } from "@/types/chat";
import { createClient } from "@/utils/supabase/client";
import { ImageWithFallback, ImgWithTimeout } from "@/components/image";
import { SvgIconButton } from "@/components/button";
import { formatLocalTime } from "@/utils/date";
import {
  chatContainer,
  chatHeader,
  imageWrapper,
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
  profileLink,
  sendButton,
  unreadMessage,
} from "./page.css";
import { uploadImage } from "@/utils/supabase/storage";
import { toast } from "sonner";
import Link from "next/link";
import { ImageUploading } from "@/app/chat/[roomId]/component/ImageUploading";
import { convertHeicToJpeg } from "@/utils/image";

interface Props {
  userId: string;
  roomId: string;
  initialMessages: MessageDto[];
  otherNickname: string;
  profilePicture: string;
}

export default function ChatRoomClientPage({
  userId,
  roomId,
  initialMessages,
  otherNickname,
  profilePicture,
}: Props) {
  const router = useRouter();
  const [messages, setMessages] = useState<MessageDto[]>(initialMessages || []);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isImageSending, setIsImageSending] = useState<boolean>(false);

  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const supabase = createClient();

  useEffect(() => {
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
      async (payload) => {
        const newMessage = payload.new;
        setMessages((prev) => [
          {
            id: newMessage.id,
            content: newMessage.content,
            createdAt: newMessage.created_at,
            sender: newMessage.user_id === userId ? Sender.Me : Sender.Other,
            isRead: newMessage.is_read,
            imageUrl: newMessage.image_url,
          },
          ...prev,
        ]);

        if (newMessage.user_id !== userId) {
          try {
            await markMessagesAsRead(roomId);
          } catch (error) {
            console.error("새 메시지 읽음 처리 실패:", error);
          }
        }
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

    channel.subscribe((status, err) => {
      if (
        status === "CHANNEL_ERROR" ||
        status === "TIMED_OUT" ||
        status === "CLOSED" ||
        err
      ) {
        if (err) {
          console.error("채팅방 에러 발생: ", err);
        }
        router.push("/chat");
      }
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, supabase, userId]);

  const sendMessage = async (imageFile?: File) => {
    if ((!newMessage.trim() && !imageFile) || isSending) return;

    try {
      setIsSending(true);
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImage(
          imageFile,
          `private/${roomId}/${userId}/${Date.now()}`,
          "images",
        );
      }

      await sendMessageAction({
        roomId,
        userId,
        content: imageFile ? "" : newMessage.trim(),
        imageUrl,
      });

      setNewMessage("");
    } catch (error) {
      console.error(error);
      toast("메세지 전송에 실패했습니다");
    } finally {
      setIsSending(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsImageSending(true);
      let file = e.target.files?.[0];
      if (file) {
        if (file.type === "image/heic" || file.name.endsWith(".heic")) {
          file = await convertHeicToJpeg(file);
        }
        await sendMessage(file);
      }
    } catch (e) {
      console.error("채팅 이미지 전송 실패: ", e);
      toast("메세지 전송에 실패했습니다");
    } finally {
      setIsImageSending(false);
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

  const onClickImageButton = () => {
    if (imageRef != null && imageRef.current != null) {
      imageRef.current!.click();
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
        <Link
          href={`/profile/${encodeURIComponent(otherNickname)}`}
          className={profileLink}
        >
          <ImageWithFallback
            src={profilePicture}
            alt="프로필 이미지"
            width={30}
            height={30}
            style={{ borderRadius: "50%" }}
          />
          <span className={nickname}>{otherNickname}</span>
        </Link>
      </div>

      <div ref={messageContainerRef} className={messageContainer}>
        {isImageSending && <ImageUploading />}
        {messages.map((msg, index) => {
          const showDate =
            index === messages.length - 1 ||
            formatLocalTime(messages[index + 1].createdAt, "YYYY년 M월 D일") !==
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
                <>
                  {msg.imageUrl ? (
                    <div className={imageWrapper}>
                      <ImgWithTimeout
                        src={msg.imageUrl}
                        alt="이미지"
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          borderRadius: "10px",
                          overflow: "hidden",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className={
                        msg.sender === Sender.Me ? messageMe : messageOther
                      }
                    >
                      {msg.content}
                    </div>
                  )}
                </>
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
        <SvgIconButton
          src="/icon/camera_white.svg"
          alt="사진"
          width={18}
          height={18}
          onClick={onClickImageButton}
          className={sendButton}
          disabled={isSending}
        />
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSending || isImageSending}
          placeholder={
            isSending || isImageSending ? "메세지 전송 중..." : "메세지 입력"
          }
          className={input}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "43px";
            const scrollHeight = target.scrollHeight;
            const maxHeight = 100;
            target.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
          }}
        />
        <input
          ref={imageRef}
          type="file"
          accept="image/*,image/heic"
          hidden
          onChange={handleFileChange}
        />
        <SvgIconButton
          src="/icon/send.svg"
          alt="전송"
          width={18}
          height={18}
          onClick={() => sendMessage()}
          className={sendButton}
          disabled={isSending || !newMessage.trim().length}
        />
      </div>
    </div>
  );
}
