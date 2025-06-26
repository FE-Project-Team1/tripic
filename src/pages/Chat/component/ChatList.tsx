import { Link } from 'react-router-dom';
import basicProfile from '../../../assets/basic-profile.svg';

function ChatList() {
  const chatItems = [
    {
      id: 1,
      name: '애월읍 위니브 감귤농장',
      message: '이번에 정정 언제하맨마씸?',
      date: '2020.10.25',
      unread: true,
    },
    {
      id: 2,
      name: '제주감귤마을',
      message: '깊은 어둠의 존재감, 롤스로이스 뉴 블랙 배지...',
      date: '2020.10.25',
      unread: true,
    },
    {
      id: 3,
      name: '누구네 농장 친환경 한라봉',
      message: '내 차는 내가 평가한다. 오픈 이벤트에 참여 하...',
      date: '2020.10.25',
      unread: false,
    },
  ];

  return (
    <section className="flex justify-center px-4 pt-18">
      <h2 className="sr-only">채팅 리스트</h2>
      <ul className="w-full max-w-screen-sm space-y-5">
        {chatItems.map((item) => (
          <li key={item.id} className="relative w-full">
            <Link to="" className="flex items-center gap-3">
              <figure className="relative w-[42px] h-[42px] shrink-0">
                <img
                  src={basicProfile}
                  alt={`${item.name} 프로필 이미지`}
                  className="w-full h-full rounded-full object-cover"
                />
                {item.unread && (
                  <span className="absolute top-0 left-0 w-3 h-3 bg-[#F26E22] rounded-full" />
                )}
              </figure>
              <div className="flex-1 overflow-hidden">
                <h3 className="text-sm text-black leading-[14px] truncate">
                  {item.name}
                </h3>
                <p className="text-xs text-[var(--color-gray)] truncate mt-1 mb-[3px] leading-[12px]">
                  {item.message}
                </p>
              </div>
              <time className="absolute right-0 bottom-[3px] text-[10px] text-[var(--color-light-gray)]">
                {item.date}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ChatList;
