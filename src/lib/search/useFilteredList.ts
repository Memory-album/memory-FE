import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';
import { filtering } from './filtering';

export const useFilteredList = <T extends { searchableText?: string }>(
  initialList: T[],
  processedData: T[],
  searchText: string,
  delay: number = 1000,
) => {
  const [filteredList, setFilteredList] = useState<T[]>(initialList);
  const [loading, setLoading] = useState(false);

  const debouncedText = useDebounce(searchText, delay);

  useEffect(() => {
    const isEmpty =
      debouncedText.replace(/<(.|\n)*?>/g, '').trim().length === 0;

    if (isEmpty) {
      setFilteredList(initialList);
      return;
    }

    setLoading(true);
    filtering(processedData, debouncedText).then((filteredData) => {
      setFilteredList(filteredData);
      setLoading(false);
    });
  }, [debouncedText, initialList, processedData]);

  return { filteredList, loading };
};
