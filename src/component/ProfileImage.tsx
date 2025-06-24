import { useState } from 'react';
import defaultProfile from '../assets/default-profile.png';
import image from '../assets/image.svg';

interface IProfileImage {
  upload?: boolean;
}

function ProfileImage({ upload = false }: IProfileImage) {
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
          <div className="w-9 h-9 absolute bottom-0 right-0 bg-main rounded-[50%] flex justify-center items-center">
            <img src={image} alt="image" className="w-[22px] h-[22px]" />
          </div>
          <input
            type="file"
            className="opacity-0 w-9 h-9 absolute bottom-0 right-0"
            onChange={handleImageChange}
          />
        </>
      )}
    </div>
  );
}

export default ProfileImage;
