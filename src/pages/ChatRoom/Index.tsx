import { useState, useRef } from 'react';
import TopNavigation from '../../component/Navigation/TopNavigation';
import ChatList from './component/ChatList';
import CommentInput from '../../component/CommentInput';
import ButtonImg from '../../assets/img-button.png';

function ChatRoom() {
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 선택 핸들러
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };
  // 이미지 파일 선택 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setSelectedImageFile(file);
      console.log('이미지 선택됨:', file.name);
    } catch (error) {
      console.error('이미지 선택 실패:', error);
      alert('이미지 선택에 실패했습니다.');
    }
  };

  return (
    <>
      <TopNavigation
        backBtn={true}
        heading="애월읍 위니브 감귤농장"
        settingBtn={true}
        headingSize="text-[14px]"
      />
      <main className="min-h-screen px-4 pt-[296px] pb-[61px] bg-[#F2F2F2]">
        <ChatList />
      </main>
      <CommentInput
        profileImage={ButtonImg}
        placeholder="메시지 입력하기..."
        submitText="전송"
        onFileClick={handleFileClick}
        hasImage={!!selectedImageFile}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </>
  );
}

export default ChatRoom;
