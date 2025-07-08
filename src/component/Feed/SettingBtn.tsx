// src/component/Feed/PostMoreBtn.tsx
import { useModal } from '../../context/ModalContext';
import { getCookie } from '../../utils/auth';
import moreBtn from '../../assets/s-icon-more-vertical.svg';
import type { IUserPost } from '../../types/commonType';

interface PostMoreBtnProps {
  post: IUserPost;
}

function PostMoreBtn({ post }: PostMoreBtnProps) {
  const { openCustomModal } = useModal();
  const currentUserAccountname = getCookie('accountname');

  const handleClick = () => {
    const isMyPost = post.author.accountname === currentUserAccountname;

    if (isMyPost) {
      // 본인 포스트 메뉴
      const myPostItems = [
        {
          label: '삭제',
          onClick: () => {
            console.log('포스트 삭제:', post.id);
            // TODO: 삭제 확인 모달 또는 직접 삭제
          },
        },
        {
          label: '수정',
          onClick: () => {
            console.log('포스트 수정:', post.id);
            // TODO: 수정 페이지로 이동
          },
        },
      ];
      openCustomModal(myPostItems);
    } else {
      // 다른 사람 포스트 메뉴
      const otherPostItems = [
        {
          label: '신고하기',
          onClick: () => {
            console.log('포스트 신고:', post.id);
            // TODO: 신고 로직
          },
        },
      ];
      openCustomModal(otherPostItems);
    }
  };

  return (
    <button onClick={handleClick}>
      <img src={moreBtn} alt="더보기 버튼" />
    </button>
  );
}

export default PostMoreBtn;
