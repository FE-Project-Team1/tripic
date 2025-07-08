import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { getCookie } from '../../utils/auth';
import { deletePost } from '../../api/post/deletePost';
import { useQueryClient } from '@tanstack/react-query';
import moreBtn from '../../assets/s-icon-more-vertical.svg';
import type { IUserPost } from '../../types/commonType';

interface PostMoreBtnProps {
  post: IUserPost;
}

function PostMoreBtn({ post }: PostMoreBtnProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { openCustomModal, openBtnPopup } = useModal();
  const currentUserAccountname = getCookie('accountname');

  // 게시글 삭제 로직
  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost(postId);
      queryClient.invalidateQueries({
        queryKey: ['userPosts', currentUserAccountname],
      });
      queryClient.removeQueries({ queryKey: ['postDetail', postId] });
      alert('게시글이 삭제되었습니다.');
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  const handleClick = () => {
    const isMyPost = post.author.accountname === currentUserAccountname;

    if (isMyPost) {
      // 본인 포스트 메뉴
      const myPostItems = [
        {
          label: '수정',
          onClick: () => {
            console.log('포스트 수정:', post.id);
            navigate(`/post-modication/${post.id}`);
          },
        },
        {
          label: '삭제',
          onClick: () => {
            console.log('포스트 삭제:', post.id);
            // TODO: 삭제 확인 모달 또는 직접 삭제
            openBtnPopup({
              title: '게시글을 삭제할까요?',
              confirmText: '삭제',
              onConfirmClick: () => handleDeletePost(post.id),
            });
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
