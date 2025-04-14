export async function getMedia({
  queryKey,
}: {
  queryKey: [string, string, string, string, string];
}) {
  const [_resource, groupId, _albums, albumId, _media] = queryKey;
  const pageableObj = {
    page: 0,
    size: 1,
    sort: ['string'],
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/groups/${groupId}/albums/${albumId}/media`,
    {
      next: {
        tags: ['groups', groupId, 'albums', albumId, 'media'],
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
