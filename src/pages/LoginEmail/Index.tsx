import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CommonBtn from '../../component/CommonBtn';
import CommonInput from '../../component/CommonInput';

interface LoginFormValues {
  email: string;
  password: string;
}

function LoginEmail() {
  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<LoginFormValues>({
    mode: 'onChange', // 입력값 변경 시마다 검증
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log('로그인 데이터:', data);
    // 로그인 로직 구현
  };

  return (
    <section className="pt-[30px] px-[34px]">
      <h1 className="text-center font-medium text-2xl mb-10">로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CommonInput
          name="email"
          text="이메일"
          type="text"
          register={register}
          required
        />
        <CommonInput
          name="password"
          text="비밀번호"
          type="password"
          register={register}
          required
        />
        <div className="mt-[30px]">
          <CommonBtn
            text={'로그인'}
            type="submit"
            disabled={!isValid || !isDirty}
          />
        </div>
      </form>
      <div className="mt-5 text-center">
        <Link to="" className="text-xs text-gray">
          이메일로 회원가입
        </Link>
      </div>
    </section>
  );
}

export default LoginEmail;
