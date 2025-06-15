export async function getMembersByGroupId({
  queryKey,
}: {
  queryKey: [string, string, string];
}) {
  const [_1, id] = queryKey;
  const response = await fetch(`/backend/api/v1/groups/${id}/members`, {
    next: {
      tags: ['groups', id, 'members'],
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch group data');
  }

  const { data } = await response.json();
  return data;
}
