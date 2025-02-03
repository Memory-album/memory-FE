import { create } from 'zustand';

interface CreatedBy {
  id: number;
  name: string;
  profileImgUrl: string;
}

interface Album {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: [string];
  theme: string;
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
      const response = await fetch('/api/v1/mock/albums');
      if (!response.ok) {
        throw new Error('Failed to fetch albums');
      }
      const data: Album[] = await response.json();
      const minimalData = data.map((album) => ({
        id: album.id,
        title: album.title,
        description: album.description,
        thumbnailUrl: album.thumbnailUrl,
        theme: album.theme,
        createdBy: album.createdBy,
      }));
      set({ albums: minimalData });
    } catch (e) {
      console.error('Error fetching albums: ', e);
    }
  },
}));

export default useAlbumStore;
