// src/hooks/useUserSearch.ts
import { useQuery } from '@tanstack/react-query';
import { getSearch } from '../api/search/getSearch';
import { useDebounce } from './useDebounce';

export function useUserSearch(keyword: string) {
  const debouncedKeyword = useDebounce(keyword, 500);

  return useQuery({
    queryKey: ['userSearch', debouncedKeyword],
    queryFn: () => getSearch(debouncedKeyword),
    enabled: !!debouncedKeyword && debouncedKeyword.length > 0,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
    retry: 1,
  });
}
