import TopNavigation from '../../component/Navigation/TopNavigation';
import BottomNavigation from '../../component/BottomNavigation';
import ChatList from './component/ChatList';
import BottomModal from '../../component/BottomModal';
import BtnPopup from '../../component/BtnPopup';

function Chat() {
  return (
    <>
      <TopNavigation backBtn={true} settingBtn={true} />
      <ChatList />
      <BottomModal />
      <BtnPopup />
      <BottomNavigation activePage="Chat" />
    </>
  );
}

export default Chat;
