import { useState } from 'react';
import { Link } from 'react-router-dom';
import heart from '../../assets/heart.svg';
import heartFill from '../../assets/heart-fill.svg';
import messageCircleBtn from '../../assets/message-circle.svg';
import profileImage from '../../assets/profile-img.svg';
import SettingBtn from './SettingBtn';
import type { IUserPost } from '../../types/commonType';

interface IFeed {
  post: IUserPost;
}

function getProfileImage(img: string | undefined) {
  console.log(img);
  if (!img || img === 'null' || img === '' || img.startsWith('/'))
    return profileImage;
  if (img.startsWith('http')) return img;
  return profileImage;
}

function Feed({ post }: IFeed) {
  const [like, setLike] = useState(false);

  const handleLikeClick = () => {
    setLike((prev) => !prev);
  };

  return (
    <article className="max-w-[608px] mb-8" key={post.id}>
      {/* 프로필 헤더 영역 */}
      <div className="flex justify-between items-center">
        <Link to={`/your-profile/${post.author?.accountname}`}>
          <div className="flex items-start gap-[12px]">
            <img
              src={getProfileImage(post?.author?.image)}
              alt="프로필이미지"
              className="start-0 w-10 h-10 rounded-full bg-transparent"
              crossOrigin="anonymous"
            />
            <div>
              <p className="text-[14px] font-bold pt-[4px] pb-[2px] ">
                {post?.author?.username}
              </p>
              <p className="text-[12px] text-gray w-[107px] h-[14px]">
                @{post?.author?.accountname}
              </p>
            </div>
          </div>
        </Link>
        <SettingBtn post={post} />
      </div>

      <div className="pl-[54px]">
        {/* 본문 영역 */}
        <p className="text-[14px] pt-[16px]">{post.content}</p>

        {/* 이미지 영역 */}
        {post.image && (
          <Link to={`/post/${post.id}`}>
            <div className="mt-[16px] mb-[12px] aspect-[304/228] rounded-[10px]">
              <img
                src={post.image}
                alt="post"
                className="w-full h-full block rounded-[10px]"
                crossOrigin="anonymous"
              />
            </div>
          </Link>
        )}

        {/* 좋아요, 댓글 영역 */}
        <ul className="flex items-center gap-[16px] mt-[12px]">
          <li className="flex items-center gap-[6px]">
            <button onClick={handleLikeClick}>
              {/* likedPosts 상태에 따라 하트 아이콘 변경 */}
              <img src={like ? heartFill : heart} alt="좋아요" />
            </button>
            <span className="text-[12px] text-gray">{post.heartCount}</span>
          </li>
          <li>
            <Link
              to={`/post/${post.id}`}
              className="flex items-center gap-[6px]"
            >
              <button>
                <img src={messageCircleBtn} alt="메세지" />
              </button>
              <span className="text-[12px] text-gray">{post.commentCount}</span>
            </Link>
          </li>
        </ul>

        <p className="text-[10px] text-gray mt-[16px]">
          {new Date(post.createdAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </article>
  );
}

export default Feed;
