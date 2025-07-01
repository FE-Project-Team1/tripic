import { useState } from 'react';
import defaultProfile from '../assets/default-profile.png';
import ImageUploadBtn from './ImageUploadBtn';

interface IProfileImage {
  upload?: boolean;
  onImageSelected?: (file: File) => void; // 선택된 파일을 부모에게 전달하는 콜백 추가
}

function ProfileImage({ upload = false, onImageSelected }: IProfileImage) {
  // 이미지 미리보기 URL 상태
  const [previewUrl, setPreviewUrl] = useState<string>(defaultProfile);

  // 이미지 선택 처리 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 이미지 파일인지 확인
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 파일 미리보기 URL 생성
    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);

    // 선택된 파일을 부모 컴포넌트로 전달
    if (onImageSelected) {
      onImageSelected(file);
    }
  };

  return (
    <div className="w-[110px] h-[110px] relative">
      <div className="w-[110px] h-[110px] rounded-[50%] border-light-gray">
        <img
          src={previewUrl}
          alt="profile"
          className="block w-full h-full rounded-[50%]"
        />
      </div>
      {upload && (
        <>
          <ImageUploadBtn handleImageChange={handleImageChange} />
        </>
      )}
    </div>
  );
}

export default ProfileImage;
