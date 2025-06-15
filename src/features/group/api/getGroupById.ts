export async function getGroupById({
  queryKey,
}: {
  queryKey: [string, string];
}) {
  const [_1, id] = queryKey;
  const response = await fetch(`/backend/api/v1/groups/${id}`, {
    next: {
      tags: ['groups', id],
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch group data');
  }

  const { data } = await response.json();
  return data;
}
