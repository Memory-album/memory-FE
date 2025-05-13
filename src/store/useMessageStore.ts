import { create } from 'zustand';

type Message = {
  id: string;
  content: string;
};

interface MessageState {
  messages: { [roomId: string]: Message[] };
  getMessages: (roomId: string) => Message[];
  hasMessages: (roomId: string) => boolean;
  uploadMessage: (roomId: string, message: Message) => void;
  updateMessage: (roomId: string, id: string, content: string) => void;
  clearMessages: (roomId: string) => void;
  deleteRoom: (roomId: string) => void;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: {},

  getMessages: (roomId) => {
    return get().messages[roomId] || [];
  },

  hasMessages: (roomId) => {
    return (get().messages[roomId]?.length || 0) > 0;
  },

  uploadMessage: (roomId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [roomId]: [...(state.messages[roomId] || []), message],
      },
    })),

  updateMessage: (roomId, id, content) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [roomId]: state.messages[roomId]?.map((message) =>
          message.id === id ? { ...message, content } : message,
        ),
      },
    })),

  clearMessages: (roomId) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [roomId]: [],
      },
    })),

  deleteRoom: (roomId) => {
    set((state) => {
      const newMessages = { ...state.messages };
      delete newMessages[roomId];
      return { messages: newMessages };
    });
  },
}));
