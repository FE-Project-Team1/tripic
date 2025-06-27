import { useForm } from 'react-hook-form';
import ProfileImage from '../../../component/ProfileImage';
import FormInput from '../../../component/FormInput';
import type { IProfile } from '../../SignUp/Index';

function ProfileInput() {
  // React Hook Form 설정
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // watch,
  } = useForm<IProfile>({
    mode: 'onBlur',
  });

  return (
    <main className="pt-[78px]">
      <h2 className="sr-only">프로필 수정</h2>
      <form>
        <div className="flex justify-center">
          <ProfileImage upload={true} />
        </div>
        <div className="mt-[30px] px-[34px]">
          <FormInput
            name="username"
            text="사용자 이름"
            register={register}
            required
            minLength={2}
            maxLength={10}
            errorMessage={errors.username?.message}
          />
          <FormInput
            name="accountName"
            text="계정 ID"
            variant="accountName"
            register={register}
            required
            errorMessage={errors.accountName?.message}
          />
          <FormInput
            name="intro"
            text="소개"
            register={register}
            required
            errorMessage={errors.intro?.message}
          />
        </div>
      </form>
    </main>
  );
}

export default ProfileInput;
