import { create } from 'zustand';
import useGroupStore from './useGroupStore';
import useUserStore from '@/store/useUserInfo';

interface CreatedBy {
  name: string;
  profileImgUrl: string;
}

interface Album {
  id: number;
  title: string;
  thumbnailUrl: string[];
  likes: boolean;
  createdBy: CreatedBy;
}

interface AlbumStore {
  albums: Album[];
  hasAlbums: boolean;
  fetchAlbums: () => Promise<void>;
  refreshAlbums: () => Promise<void>;
}

const useAlbumStore = create<AlbumStore>((set) => ({
  albums: [],
  hasAlbums: false,
  fetchAlbums: async () => {
    try {
      const { group } = useGroupStore.getState();
      if (!group) {
        throw new Error('No group available');
      }
      const { userInfo } = useUserStore.getState();
      const groupId = userInfo?.currentGroupId;

      if (!groupId) {
        throw new Error('No group ID available');
      }

      const response = await fetch(`/backend/api/v1/albums/group/${groupId}`, {
        method: 'get',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch albums');
      }
      const data = await response.json();
      set({
        albums: data.data,
        hasAlbums: data.data.length > 0,
      });
    } catch (e) {
      console.error('Error fetching albums: ', e);
    }
  },
  refreshAlbums: async () => {
    try {
      const { group } = useGroupStore.getState();
      if (!group) {
        throw new Error('No group available');
      }
      const { userInfo } = useUserStore.getState();
      const groupId = userInfo?.currentGroupId;

      if (!groupId) {
        throw new Error('No group ID available');
      }

      const response = await fetch(`/backend/api/v1/albums/group/${groupId}`, {
        method: 'get',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch albums');
      }
      const data = await response.json();
      set({
        albums: data.data,
        hasAlbums: data.data.length > 0,
      });
    } catch (e) {
      console.error('Error refreshing albums: ', e);
    }
  },
}));

export default useAlbumStore;
