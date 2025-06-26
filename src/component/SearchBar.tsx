// src/components/SearchBar.tsx

import React, { useState } from 'react';
import iconArrowLeft from '../assets/icon-arrow-left.png';

interface SearchBarProps {
  onClose?: () => void;
}

function SearchBar({ onClose }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('검색어:', searchTerm);
  };

  return (
    // 전체 검색창 오버레이
    <div
      className="fixed inset-0 bg-white z-50 flex flex-col pt-2 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="계정 검색"
    >
      {/* 검색창 상단바*/}
      <div className="flex items-center w-full">
        <button
          type="button"
          onClick={onClose}
          className="h-6 w-6 cursor-pointer p-0 border-none bg-transparent flex items-center justify-center flex-shrink-0"
          aria-label="검색창 닫기"
        >
          <img src={iconArrowLeft} alt="뒤로 가기" className="h-full w-full" />
        </button>

        <div className="flex-grow h-8 ml-4 mr-2">
          <form
            onSubmit={handleSubmit}
            className="flex items-center w-full h-full rounded-full bg-[#F2F2F2] px-3"
          >
            <label htmlFor="account-search-input" className="sr-only">
              계정 검색
            </label>
            <input
              id="account-search-input"
              type="text"
              placeholder="계정 검색"
              className="flex-grow outline-none text-sm bg-transparent placeholder-[#C4C4C4]"
              value={searchTerm}
              onChange={handleInputChange}
              autoFocus
            />
          </form>
        </div>
      </div>

      {/* 검색 입력 필드 바로 아래에 가로선 추가 (화면 너비 전체) */}
      <div className="absolute top-[48px] left-0 right-0 border-b-[1px] border-[#dbdbdb]">
        {/* 이 div는 선 역할을 하며, 내용은 없습니다. */}
      </div>
    </div>
  );
}

export default SearchBar;
