import { Link } from 'react-router-dom';

function BottomNavigation() {
  return (
    <ul className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 px-[6px] z-50 h-15">
      {/* Home */}
      <li className="flex flex-col items-center w-21">
        <Link to="/" className="flex flex-col items-center">
          <svg
            className="w-6 h-6 text-[#FF7E36]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.1L1 12h3v9h7v-6h2v6h7v-9h3L12 2.1z" />
          </svg>
          <span className="text-xs mt-1 text-[#FF7E36]">홈</span>
        </Link>
      </li>

      {/* Chat */}
      <li className="flex flex-col items-center w-21">
        <Link to="/chat" className="flex flex-col items-center">
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
          <span className="text-xs mt-1 text-gray-500">채팅</span>
        </Link>
      </li>

      {/* Create Post */}
      <li className="flex flex-col items-center w-21">
        <Link to="/create-post" className="flex flex-col items-center">
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span className="text-xs mt-1 text-gray-500">게시물 작성</span>
        </Link>
      </li>

      {/* Profile */}
      <li className="flex flex-col items-center w-21">
        <Link to="/profile" className="flex flex-col items-center">
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          <span className="text-xs mt-1 text-gray-500">프로필</span>
        </Link>
      </li>
    </ul>
  );
}

export default BottomNavigation;
