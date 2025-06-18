import { Link } from 'react-router-dom';
import iconEdit from '../assets/icon-edit.svg';
import iconHomeFill from '../assets/icon-home-fil.svg';
import iconMessageCircle from '../assets/icon-message-circle.svg';
import iconUser from '../assets/icon-user.svg';

interface IList {
  svg: string;
  text: string;
}

function List({ svg, text }: IList) {
  return (
    <li className="flex flex-col items-center w-21">
      <Link to="/" className="flex flex-col items-center">
        <img src={svg} alt={text} className="w-6 h-6" />
        <span className="text-xs mt-1 text-[#FF7E36]">{text}</span>
      </Link>
    </li>
  );
}

function BottomNavigation() {
  return (
    <ul className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 px-[6px] z-50 h-15">
      <List svg={iconHomeFill} text={'홈'} />
      <List svg={iconMessageCircle} text={'채팅'} />
      <List svg={iconEdit} text={'게시물 작성'} />
      <List svg={iconUser} text={'프로필'} />
    </ul>
  );
}

export default BottomNavigation;
