export async function getUserGroups() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/groups/my-groups`,
    {
      next: {
        tags: ['user', 'groups'],
      },
      credentials: 'include',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  const { data } = await response.json();
  return data;
}
