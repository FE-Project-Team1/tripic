import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../../assets/image.svg';
import CommonBtn from '../../../component/CommonBtn';
import ImageUploadBtn from '../../../component/ImageUploadBtn';
import { uploadImage, getImageUrl } from '../../../api/image/imageApi';
import { uploadPost } from '../../../api/post/postApi';

function UploadForm() {
  const navigate = useNavigate();
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('');
  const [textContent, setTextContent] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // 업로드 버튼 활성화 조건: 텍스트가 있거나 이미지가 있을 경우
  const isUploadEnabled =
    textContent.trim().length > 0 || selectedImageFile !== null;

  // 이미지 선택 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // 파일 저장
      setSelectedImageFile(file);

      // 미리보기용 로컬 URL 생성
      const previewUrl = URL.createObjectURL(file);
      setPreviewImageUrl(previewUrl);
    } catch (error) {
      console.error('이미지 선택 실패:', error);
      alert('이미지 선택에 실패했습니다.');
    }
  };

  // 텍스트 입력 핸들러
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(event.target.value);
  };

  // 업로드 버튼 클릭 핸들러
  const handleUpload = async () => {
    if (!isUploadEnabled) return;

    try {
      setIsUploading(true);

      let imageUrl = '';

      // 이미지가 있을 경우 먼저 이미지 업로드
      if (selectedImageFile) {
        console.log('이미지 업로드 시작...');
        const imageUploadResponse = await uploadImage(selectedImageFile);
        imageUrl = getImageUrl(imageUploadResponse.info.filename);
        console.log('이미지 업로드 성공:', imageUrl);
      }

      // 게시글 업로드 데이터 준비
      const postData = {
        content: textContent.trim(),
        image: imageUrl,
      };

      console.log('게시글 업로드 시작...', postData);

      // 게시글 업로드
      const responseData = await uploadPost(postData);

      console.log('게시글 업로드 성공', responseData);

      // 성공 시 알림 및 페이지 이동
      alert('게시글 업로드 완료');
      navigate('/my-profile');
    } catch (error) {
      console.error('업로드 실패:', error);
      alert('업로드 실패했습니다');
    } finally {
      setIsUploading(false);
    }
  };

  // 컴포넌트 언마운트 시 미리보기 URL 정리
  useEffect(() => {
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  return (
    <section className="pt-17 px-4">
      <h2 className="sr-only">게시글 입력하기</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpload();
        }}
      >
        <textarea
          value={textContent}
          onChange={handleTextChange}
          placeholder="게시글 입력하기..."
          className="w-full min-h-[200px] aspect-[414/273] placeholder:text-sm placeholder:text-light-gray-02 text-sm"
        />
        <div className="relative bg-light-gray mine-h-[200px] aspect-[414/273] mt-5 rounded-[10px] flex justify-center items-center p-6">
          <div className="flex flex-col gap-4 items-center">
            <img src={image} alt={image} className="block w-20 h-20" />
            <p className="text-white">이곳에 이미지를 올려주세요.</p>
          </div>
          {previewImageUrl && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <img
                src={previewImageUrl}
                alt="미리보기"
                className="w-full h-full object-cover rounded-[6px]"
              />
            </div>
          )}
          <ImageUploadBtn
            position="bottom-right-3"
            handleImageChange={handleImageChange}
          />
        </div>
        <div className="mt-10">
          <CommonBtn
            text={isUploading ? '로딩중...' : '업로드'}
            type="submit"
            disabled={!isUploadEnabled || isUploading}
          />
        </div>
      </form>
    </section>
  );
}

export default UploadForm;
