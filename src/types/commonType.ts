// 기본 프로필 인터페이스
export interface IProfile {
  username: string;
  accountName: string;
  intro: string;
  image: string;
}

// 기본 상품 인터페이스
interface IProductAuthor {
  _id: string;
  username: string;
  accountname: string;
  intro: string;
  image: string;
  isfollow: boolean;
  following: string[];
  follower: string[];
  followerCount: number;
  followingCount: number;
}

export interface IProduct {
  id: string;
  itemName: string;
  price: number;
  link: string;
  itemImage: string;
  author: IProductAuthor;
}

// BtnPopup의 props 타입 정의
export interface IBtnPopup {
  title?: string;
  confirmText?: string;
  onConfirmClick?: () => void;
}
