// ProfileImage.tsx
import { useState, useEffect } from 'react';
import defaultProfile from '../assets/default-profile.png';
import ImageUploadBtn from './ImageUploadBtn';

interface IProfileImage {
  upload?: boolean;
  src?: string; // 외부에서 이미지 URL을 받을 수 있는 prop
  onImageSelected?: (file: File) => void;
}

const DEFAULT_PROFILE = '/Ellipse.png';

function ProfileImage({ upload = false, src, onImageSelected }: IProfileImage) {
  console.log(src);
  const [previewUrl, setPreviewUrl] = useState<string>(src || defaultProfile); // src가 있으면 src, 없으면 defaultProfile로 초기화

  useEffect(() => {
    if (src && src !== DEFAULT_PROFILE) {
      // src가 유효한 URL일 경우
      setPreviewUrl(src);
    } else {
      // src가 null 또는 undefined일 경우
      setPreviewUrl(defaultProfile); // 기본 이미지로 설정
    }
  }, [src]); // src prop이 변경될 때마다 실행

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);

    if (onImageSelected) {
      onImageSelected(file);
    }
  };

  return (
    <div className="w-[110px] h-[110px] relative">
      <div className="w-[110px] h-[110px] rounded-[50%] border-light-gray">
        <img
          src={previewUrl} // 현재 previewUrl에 따라 이미지 표시
          alt="profile"
          className="block w-full h-full rounded-[50%]"
          crossOrigin="anonymous"
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
