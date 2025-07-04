import TopNavigation from '../../component/Navigation/TopNavigation';
import BottomNavigation from '../../component/BottomNavigation';
import ChatList from './component/ChatList';
import BottomModal from '../../component/BottomModal';
import { ModalProvider, useModal } from '../../context/ModalContext';
import BtnPopup from '../../component/BtnPopup';

function ChatContent() {
  const { openConfirmModal } = useModal();

  const modalItems = [
    {
      label: '설정 및 개인정보',
      onClick: () => {
        console.log('설정 및 개인정보 클릭');
      },
    },
    {
      label: '로그아웃',
      onClick: () => {
        openConfirmModal(); // BtnPopup 열기
      },
    },
  ];

  return (
    <>
      <TopNavigation backBtn={true} settingBtn={true} />
      <ChatList />
      <BottomModal items={modalItems} />
      <BtnPopup />
      <BottomNavigation activePage="Chat" />
    </>
  );
}

function Chat() {
  return (
    <ModalProvider>
      <ChatContent />
    </ModalProvider>
  );
}

export default Chat;
