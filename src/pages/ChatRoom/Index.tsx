import TopNavigation from '../../component/Navigation/TopNavigation';
import ChatList from './component/ChatList';
import CommentInput from '../../component/CommentInput';
import ButtonImg from '../../assets/img-button.png';

function ChatRoom() {
    return (
        <>
            <TopNavigation backBtn={true} heading="애월읍 위니브 감귤농장" settingBtn={true} headingSize="text-[14px]" />
            <main className="min-h-screen px-4 pt-[296px] pb-[61px] bg-[#F2F2F2]">
                <ChatList />
            </main>
            <CommentInput
                profileImage={ButtonImg}
                placeholder="메시지 입력하기..."
                submitText="전송"
            />
        </>
    );
}

export default ChatRoom;
