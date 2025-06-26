import TopNavigation from '../../component/Navigation/TopNavigation';
import BottomNavigation from '../../component/BottomNavigation';
import ChatList from './component/ChatList';

function Chat() {
  return (
    <>
      <TopNavigation backBtn={true} settingBtn={true} />
      <ChatList />
      <BottomNavigation activePage="Chat" />
    </>
  );
}

export default Chat;
