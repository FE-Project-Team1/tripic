import { useForm } from 'react-hook-form';
import defaultProfile from '../../../assets/default-profile.png';
import image from '../../../assets/image.svg';
import CommonInput from '../../../component/CommonInput';
import CommonBtn from '../../../component/CommonBtn';

// 프로필 폼 데이터 타입 정의
interface ProfileFormData {
  username: string;
  accountId: string;
  introduce: string;
}

function ProfileSetting() {
  // useForm 훅으로 실제 register 함수 생성
  const { register } = useForm<ProfileFormData>({
    defaultValues: {
      username: '',
      accountId: '',
      introduce: '',
    },
  });

  return (
    <section className="pt-[30px] px-[34px]">
      <h1 className="text-center font-medium text-2xl mb-3">프로필 설정</h1>
      <p className="text-center text-gray text-sm mb-[30px]">
        나중에 언제든지 변경할 수 있습니다
      </p>
      <div className="flex justify-center">
        <div className="w-[110px] h-[110px] relative">
          <div className="w-[110px] h-[110px] rounded-[50%] border-light-gray">
            <img
              src={defaultProfile}
              alt="profile"
              className="block w-full h-full rounded-[50%]"
            />
          </div>
          <div className="w-9 h-9 absolute bottom-0 right-0 bg-main rounded-[50%] flex justify-center items-center">
            <img src={image} alt="image" className="w-[22px] h-[22px]" />
          </div>
          <input
            type="file"
            className="opacity-0 w-9 h-9 absolute bottom-0 right-0"
          />
        </div>
      </div>
      <div className="mt-[30px]">
        <CommonInput
          name="username"
          text="사용자 이름"
          type="text"
          register={register}
        />
        <CommonInput
          name="accountId"
          text="계정 ID"
          type="text"
          register={register}
        />
        <CommonInput
          name="introduce"
          text="소개"
          type="text"
          register={register}
        />
        <div className="mt-[30px]">
          <CommonBtn text="감귤마켓 시작하기" />
        </div>
      </div>
    </section>
  );
}

export default ProfileSetting;
