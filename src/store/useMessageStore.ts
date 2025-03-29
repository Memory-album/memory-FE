import { create } from 'zustand';

type Message = {
  id: string;
  content: string;
};

interface MessageState {
  roomId: string | null;
  setRoomId: (roomId: string) => void;
  deleteRoom: (roomId: string) => void;
  messages: { [roomId: string]: Message[] };
  getMessages: (roomId: string) => Message[];
  uploadMessages: (roomId: string, message: Message) => void;
  updateMessage: (roomId: string, id: string, content: string) => void;
  clearMessage: (roomId: string) => void;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  roomId: null,
  setRoomId: (roomId) => set({ roomId }),

  deleteRoom: (roomId) => {
    const newMessages = get().messages;
    delete newMessages[roomId];
    set(() => ({
      messages: {
        ...newMessages,
      },
    }));
  },

  messages: {
    room1: [
      { id: '1', content: 'Hello Room 1!' },
      { id: '2', content: 'How are you?' },
    ],
    room2: [],
  }, // 초기 상태

  getMessages: (roomId) => {
    return get().messages[roomId] || [];
  },

  clearMessage: (roomId) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [roomId]: [],
      },
    }));
  },

  uploadMessages: (roomId, message) =>
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
}));
