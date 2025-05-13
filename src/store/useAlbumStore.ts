import { create } from 'zustand';
import useGroupStore from './useGroupStore';

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
  fetchAlbums: () => Promise<void>;
}

const useAlbumStore = create<AlbumStore>((set) => ({
  albums: [],
  fetchAlbums: async () => {
    try {
      const { groups } = useGroupStore.getState();
      if (groups.length === 0) {
        throw new Error('No groups available');
      }
      const groupId = groups[0].id;
      const albumId = 1;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/groups/${groupId}/albums/${albumId}/media`,
        {
          method: 'get',
          credentials: 'include',
        },
      );
      if (!response.ok) {
        throw new Error('Failed to fetch albums');
      }
      const data: Album[] = await response.json();
      const minimalData = data.map((album) => ({
        id: album.id,
        title: album.title,
        thumbnailUrl: album.thumbnailUrl,
        likes: album.likes,
        createdBy: album.createdBy,
      }));
      set({ albums: minimalData });
    } catch (e) {
      console.error('Error fetching albums: ', e);
    }
  },
}));

export default useAlbumStore;
