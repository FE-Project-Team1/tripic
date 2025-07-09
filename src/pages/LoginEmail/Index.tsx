import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import CommonBtn from '../../component/CommonBtn';
import { postLogin } from '../../api/login/postLogin';
import { setCookie } from '../../utils/auth';
import FormInput from '../../component/FormInput';

interface LoginFormValues {
  email: string;
  password: string;
}

function LoginEmail() {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<LoginFormValues>({
    mode: 'onChange', // 입력값 변경 시마다 검증
  });

  // React Query mutation 설정
  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      // 로그인 성공 시 쿠키에 토큰 저장 (유효기간 1일)
      if (data) {
        setCookie('token', data.token, 1);
        setCookie('accountname', data.accountname, 1);

        // 상태 업데이트 후 즉시 리디렉션하지 않고
        // 약간의 지연 후 리디렉션하여 상태가 동기화되도록 함
        setTimeout(() => {
          navigate('/', { replace: true }); // replace로 이동하여 뒤로가기 방지
        }, 100);
      }
    },
    onError: (error) => {
      // 에러 발생 시 비밀번호 에러 메시지 설정
      if (error instanceof Error) {
        setPasswordError(error.message);
      } else {
        alert('로그인 실패: 알 수 없는 오류가 발생했습니다.');
      }
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    // 에러 메시지 초기화
    setPasswordError('');
    // 로그인 API 호출
    loginMutation.mutate(data);
  };

  const isFormValid = !isValid || !isDirty || loginMutation.isPending;

  return (
    <section className="pt-[30px] px-[34px]">
      <h1 className="text-center font-medium text-2xl mb-10">로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="email"
          text="이메일"
          variant="email"
          register={register}
          required
          errorMessage={errors.email?.message}
        />
        <FormInput
          name="password"
          text="비밀번호"
          variant="password"
          register={register}
          required
          errorMessage={errors.password?.message || passwordError}
        />
        <div className="mt-[30px]">
          <CommonBtn
            text={loginMutation.isPending ? '로그인 중...' : '로그인'}
            type="submit"
            disabled={isFormValid}
          />
        </div>
      </form>
      <div className="mt-5 text-center">
        <Link to="/signup" className="text-xs text-gray">
          이메일로 회원가입
        </Link>
      </div>
    </section>
  );
}

export default LoginEmail;
