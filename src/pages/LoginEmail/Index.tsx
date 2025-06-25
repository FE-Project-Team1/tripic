import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import CommonBtn from '../../component/CommonBtn';

import CommonInput from '../../component/Input/CommonInput';
import { loginFetch } from '../../api/loginApi';
import { setCookie } from '../../utils/setCookie';

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
    formState: { isValid, isDirty },
  } = useForm<LoginFormValues>({
    mode: 'onChange', // 입력값 변경 시마다 검증
  });

  // React Query mutation 설정
  const loginMutation = useMutation({
    mutationFn: loginFetch,
    onSuccess: (data) => {
      // 로그인 성공 시 쿠키에 토큰 저장 (유효기간 1일)
      if (data) {
        setCookie('token', data.token, 1);
      }
      navigate('/');
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

  const loginValid = !isValid || !isDirty || loginMutation.isPending;

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
          errorMessage={passwordError}
        />
        <div className="mt-[30px]">
          <CommonBtn
            text={loginMutation.isPending ? '로그인 중...' : '로그인'}
            type="submit"
            disabled={loginValid}
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
