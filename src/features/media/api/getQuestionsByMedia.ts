export async function getQuestionsByMedia({
  queryKey,
}: {
  queryKey: [string, string, string, string, string, string, string];
}) {
  const [_groups, groupId, _albums, albumId, _media, mediaId, _questions] =
    queryKey;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/questions/media/${mediaId}`,
    {
      next: {
        tags: [
          'groups',
          groupId,
          'albums',
          albumId,
          'media',
          mediaId,
          'questions',
        ],
      },
      credentials: 'include',
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error details:', errorData);
    throw new Error('Failed to fetch question data');
  }

  const { data } = await response.json();
  return data;
}
