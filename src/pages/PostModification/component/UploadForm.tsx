import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import image from '../../../assets/image.svg';
import CommonBtn from '../../../component/CommonBtn';
import ImageUploadBtn from '../../../component/ImageUploadBtn';
import { postImage } from '../../../api/image/postImage';
import { getImageUrl } from '../../../api/image/getImageUrl';
import { getPostDetail } from '../../../api/post/getPostDetail';
import { putPost } from '../../../api/post/putPost';
import Loading from '../../../component/Loading';
import ErrorFallback from '../../../component/ErrorFallback';
import ErrorPage from '../../404page';

function UploadForm() {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const queryClient = useQueryClient();

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('');
  const [textContent, setTextContent] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // 게시글 상세 정보 조회
  const {
    data: postDetailData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['postDetail', postId],
    queryFn: () => getPostDetail(postId!),
    enabled: !!postId,
  });

  // 게시글 데이터가 로드되면 초기값 설정
  useEffect(() => {
    if (postDetailData?.post) {
      const post = postDetailData.post;
      setTextContent(post.content);

      // 기존 이미지가 있으면 미리보기로 설정
      if (post.image) {
        setPreviewImageUrl(post.image);
      }
    }
  }, [postDetailData]);

  // 수정 버튼 활성화 조건: 텍스트가 있거나 이미지가 있을 경우
  const isUpdateEnabled =
    textContent.trim().length > 0 ||
    selectedImageFile !== null ||
    previewImageUrl;

  // 이미지 선택 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // 파일 저장
      setSelectedImageFile(file);

      // 기존 미리보기 URL 정리
      if (previewImageUrl && previewImageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewImageUrl);
      }

      // 새로운 미리보기용 로컬 URL 생성
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewImageUrl(newPreviewUrl);
    } catch (error) {
      console.error('이미지 선택 실패:', error);
      alert('이미지 선택에 실패했습니다.');
    }
  };

  // 텍스트 입력 핸들러
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(event.target.value);
  };

  // 수정 버튼 클릭 핸들러
  const handleUpdate = async () => {
    if (!isUpdateEnabled || !postId) return;

    try {
      setIsUpdating(true);

      let imageUrl = '';

      // 새로운 이미지가 선택되었을 경우 업로드
      if (selectedImageFile) {
        console.log('새 이미지 업로드 시작...');
        const imageUploadResponse = await postImage(selectedImageFile);
        imageUrl = getImageUrl(imageUploadResponse.info.filename);
        console.log('이미지 업로드 성공:', imageUrl);
      } else if (previewImageUrl && !previewImageUrl.startsWith('blob:')) {
        // 기존 이미지를 그대로 사용
        imageUrl = previewImageUrl;
      }

      // 게시글 수정 데이터 준비
      const postData = {
        content: textContent.trim(),
        image: imageUrl,
      };

      console.log('게시글 수정 시작...', postData);

      // 게시글 수정
      const responseData = await putPost(postId, postData);

      console.log('게시글 수정 성공', responseData);

      // React Query 캐시 업데이트
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      queryClient.setQueryData(['postDetail', postId], responseData);
      navigate(-1); // 이전 페이지로 돌아가기
    } catch (error) {
      console.error('수정 실패:', error);
      const errorMessage =
        error instanceof Error ? error.message : '게시글 수정에 실패했습니다.';
      alert(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  // 컴포넌트 언마운트 시 미리보기 URL 정리
  useEffect(() => {
    return () => {
      if (previewImageUrl && previewImageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }

  // 에러 발생 시
  if (error) {
    return (
      <div className="h-screen">
        <ErrorFallback />
      </div>
    );
  }

  // 게시글이 없을 때
  if (!postDetailData?.post) {
    return <ErrorPage />;
  }

  return (
    <section className="pt-17 px-4">
      <h2 className="sr-only">게시글 수정하기</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        <textarea
          value={textContent}
          onChange={handleTextChange}
          placeholder="게시글 입력하기..."
          className="w-full min-h-[200px] aspect-[414/273] placeholder:text-sm placeholder:text-light-gray-02 text-sm"
        />
        <div className="relative bg-light-gray mine-h-[200px] aspect-[414/273] mt-5 rounded-[10px] flex justify-center items-center p-6">
          {!previewImageUrl && (
            <div className="flex flex-col gap-4 items-center">
              <img
                src={image}
                alt="이미지 업로드"
                className="block w-20 h-20"
                crossOrigin="anonymous"
              />
              <p className="text-white">이곳에 이미지를 올려주세요.</p>
            </div>
          )}
          {previewImageUrl && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <img
                src={previewImageUrl}
                alt="미리보기"
                className="w-full h-full object-cover rounded-[6px]"
                crossOrigin="anonymous"
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
            text={isUpdating ? '수정중...' : '수정하기'}
            type="submit"
            disabled={!isUpdateEnabled || isUpdating}
          />
        </div>
      </form>
    </section>
  );
}

export default UploadForm;
