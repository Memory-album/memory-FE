export async function getUser() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/my-page`,
    {
      next: {
        tags: ['user'],
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
