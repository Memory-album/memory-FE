export async function getUser() {
  const response = await fetch(`/backend/user/my-page`, {
    next: {
      tags: ['user'],
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error details:', errorData);
    throw new Error('Failed to fetch user data');
  }

  const { user } = await response.json();
  return user;
}
