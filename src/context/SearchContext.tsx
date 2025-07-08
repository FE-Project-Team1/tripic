// src/context/SearchContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';

interface SearchContextType {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [keyword, setKeyword] = useState('');

  return (
    <SearchContext.Provider value={{ keyword, setKeyword }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within SearchProvider');
  }
  return context;
}
