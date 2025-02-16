import { create } from 'zustand';

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/groups/${groupId}/albums/${albumId}/media`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch albums');
      }
      const data: Album[] = await response.json();
      const minimalData = data.map((album) => ({
        id: album.id,
        title: album.title,
        thumbnailUrl: album.thumbnailUrl,
        createdBy: album.createdBy,
      }));
      set({ albums: minimalData });
    } catch (e) {
      console.error('Error fetching albums: ', e);
    }
  },
}));

export default useAlbumStore;
