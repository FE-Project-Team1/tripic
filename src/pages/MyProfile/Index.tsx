import TopNavigation from '../../component/Navigation/TopNavigation';
import BottomModal from '../../component/BottomModal';
import { ModalProvider, useModal } from '../../context/ModalContext';
import BtnPopup from '../../component/BtnPopup';
import BottomNavigation from '../../component/BottomNavigation';
import MyProfileInfo from './component/MyProfileInfo';

function MyProfileContent() {
  const { openConfirmModal } = useModal();

  const modalItems = [
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

  return (
    <>
      <TopNavigation backBtn={true} settingBtn={true} />
      <MyProfileInfo />
      <BottomModal items={modalItems} />
      <BtnPopup />
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
