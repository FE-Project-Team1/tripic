import TopNavigation from '../../component/Navigation/TopNavigation';
import ProfileInput from './component/ProfileInput';

function ProfileModification() {
  return (
    <>
      <TopNavigation backBtn={true} saveBtn={true} />
      <ProfileInput />
    </>
  );
}

export default ProfileModification;
