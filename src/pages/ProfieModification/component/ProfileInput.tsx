import ProfileImage from '../../../component/ProfileImage';

function ProfileInput() {
  return (
    <main className="pt-[78px]">
      <h2 className="sr-only">프로필 수정</h2>
      <form>
        <div className="flex justify-center">
          <ProfileImage upload={true} />
        </div>
        <div className="mt-[30px]"></div>
      </form>
    </main>
  );
}

export default ProfileInput;
