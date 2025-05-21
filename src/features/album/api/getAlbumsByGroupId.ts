export async function getAlbumsByGroupId({
  queryKey,
}: {
  queryKey: [string, string];
}) {
  const [_1, id] = queryKey;
  const response = await fetch(
    `/backend/api/v1/albums/group/${id}?thumbnailCount=1`,
    {
      next: {
        tags: ['groupAlbums', id],
      },
      credentials: 'include',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch group album data');
  }

  const { data } = await response.json();
  return data;
}
