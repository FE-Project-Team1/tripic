import { useState } from 'react';
import TopNavigation from '../../component/Navigation/TopNavigation';
import BottomModal from '../../component/BottomModal';
import { ModalProvider, useModal } from '../../context/ModalContext';
import BtnPopup from '../../component/BtnPopup';
import BottomNavigation from '../../component/BottomNavigation';
import MyProfileInfo from '../MyProfile/component/MyProfileInfo';
import TripCourse from '../MyProfile/component/TripCourse';
import Feeds from '../MyProfile/component/Feeds';
import { useParams } from 'react-router-dom';
import { getCookie } from '../../utils/auth';
import type { IBtnPopup } from '../../types/commonType';

type PageType = 'my-profile' | 'your-profile';

function MyProfileContent() {
  const [popupProps, setPopupProps] = useState<IBtnPopup>({});
  const { accountname: urlAccountname } = useParams<{ accountname: string }>();

  // accountname 존재 여부로 페이지 타입 결정
  const pageType: PageType = urlAccountname ? 'your-profile' : 'my-profile';

  // Feeds 컴포넌트에 전달할 최종 accountname 결정
  // 'my-profile'일 경우 쿠키에서, 'your-profile'일 경우 URL 파라미터에서 가져옵니다.
  // 이 로직은 TripCourse 내부에서 이미 처리되고 있지만, Feeds도 동일하게 필요합니다.
  const displayAccountname =
    pageType === 'my-profile' ? getCookie('accountname') : urlAccountname;

  const { modalItems, openModal, openConfirmModal } = useModal();

  const profileModalItems = [
    {
      label: '설정 및 개인정보',
      onClick: () => {
        console.log('설정 및 개인정보 클릭');
      },
    },
    {
      label: '로그아웃',
      onClick: () => {
        openConfirmModal(); // BtnPopup 열기
      },
    },
  ];

  // TopNavigation의 settingBtn 클릭 핸들러
  const handleSettingBtnClick = () => {
    openModal(profileModalItems);
  };

  return (
    <>
      <TopNavigation
        backBtn={true}
        settingBtn={true}
        onSettingClick={handleSettingBtnClick}
      />
      <main className="pt-12 pb-15">
        <MyProfileInfo />
        <div className="h-[6px] bg-light-gray-03"></div>
        <TripCourse
          pageType={pageType}
          urlAccountname={urlAccountname}
          setPopupProps={setPopupProps}
        />
        <div className="h-[6px] bg-light-gray-03"></div>
        <Feeds accountname={displayAccountname} />
      </main>
      <BottomModal items={modalItems} />
      <BtnPopup {...popupProps} />
      <BottomNavigation activePage="Profile" />
    </>
  );
}

function MyProfile() {
  return (
    <ModalProvider>
      <MyProfileContent />
    </ModalProvider>
  );
}

export default MyProfile;
