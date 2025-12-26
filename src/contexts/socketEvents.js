import config from "../config";

export const SOCKET_EVENTS = {
  USER_JOIN: "user_join",
  JOIN_CHAT_ROOM: "join_chat_room",
  LEAVE_CHAT_ROOM: "leave_chat_room",
  SEND_MESSAGE: "send_message",
  NEW_MESSAGE: "new_message",
  CHAT_UPDATED: "chat_updated",
  ADMIN_CHAT_UPDATED: "admin_chat_updated",
  TYPING_START: "typing_start",
  TYPING_STOP: "typing_stop",
  USER_TYPING: "user_typing",
  USER_STOP_TYPING: "user_stop_typing",
};

export const SOCKET_URL = config.socketUrl;
