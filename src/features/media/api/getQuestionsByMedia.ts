export async function getQuestionsByMedia({
  queryKey,
}: {
  queryKey: [string, string, string, string, string, string];
}) {
  const [_resource, groupId, _albums, albumId, _media, mediaId] = queryKey;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/questions/media/${mediaId}`,
    {
      next: {
        tags: ['groups', groupId, 'albums', albumId, 'media', 'questions'],
      },
      credentials: 'include',
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error details:', errorData);
    throw new Error('Failed to fetch user data');
  }

  return response.json();
}
