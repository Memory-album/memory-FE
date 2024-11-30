export async function filtering<T extends { searchableText?: string }>(
  list: T[],
  searchText: string,
): Promise<T[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2초 지연
  return list.filter((item) =>
    item.searchableText?.toLowerCase().includes(searchText.toLowerCase()),
  );
}
