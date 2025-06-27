import { useState } from 'react';
import type { ChangeEvent } from 'react';
import basicPf from '../../../assets/basic-profile.svg';

interface CommentInputProps {
  profileImage?: string;
  placeholder?: string;
  submitText?: string;
}

function CommentInput({
  profileImage = basicPf,
  placeholder = '댓글 입력하기...',
  submitText = '게시',
}: CommentInputProps) {
  const [comment, setComment] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (!comment.trim()) return;

    console.log('댓글 제출:', comment);

    setComment('');
  };

  return (
    <article className="w-full flex items-center bg-white border-t border-light-gray pt-[13px] pb-[12px] px-[16px] fixed bottom-0 left-0">
      <img src={profileImage} alt="프로필 사진" />
      <input
        type="text"
        value={comment}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="flex-grow outline-none text-sm text-gray-02 w-[91px] h-[18px] pl-[18px]"
      />
      <button
        className={`text-sm ${comment.trim() ? 'text-orange-500 font-medium' : 'text-gray-02'}`}
        onClick={handleSubmit}
        disabled={!comment.trim()}
      >
        {submitText}
      </button>
    </article>
  );
}

export default CommentInput;
