import { useForm } from 'react-hook-form';
import ProfileImage from '../../../component/ProfileImage';
import CommonInput from '../../../component/CommonInput';
import CommonBtn from '../../../component/CommonBtn';

// 프로필 폼 데이터 타입 정의
interface ProfileFormData {
  username: string;
  accountName: string;
  introduce: string;
}

function ProfileSetting() {
  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<ProfileFormData>({
    mode: 'onBlur',
  });

  return (
    <section className="pt-[30px] px-[34px]">
      <h1 className="text-center font-medium text-2xl mb-3">프로필 설정</h1>
      <p className="text-center text-gray text-sm mb-[30px]">
        나중에 언제든지 변경할 수 있습니다
      </p>
      <div className="flex justify-center">
        <ProfileImage upload={true} />
      </div>
      <div className="mt-[30px]">
        <CommonInput
          name="username"
          text="사용자 이름"
          type="text"
          register={}
        />
        <CommonInput
          name="accountName"
          text="계정 ID"
          type="text"
          register={}
        />
        <CommonInput name="introduce" text="소개" type="text" register={} />
        <div className="mt-[30px]">
          <CommonBtn text="감귤마켓 시작하기" disabled={true} />
        </div>
      </div>
    </section>
  );
}

export default ProfileSetting;
