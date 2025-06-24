import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import ProfileSetting from './component/ProfileSetting';
import SignUpEmail from './component/SignupEmail';
import { signupFetch } from '../../api/signupApi';

// 회원가입 단계를 나타내는 타입
export type SignUpStep = 'email-password' | 'profile';

// 이메일/비밀번호 데이터 타입
export interface IEmailPassword {
  email: string;
  password: string;
}

// 프로필 데이터 타입
export interface IProfile {
  username: string;
  accountName: string;
  intro: string;
  image: string;
}

function SignUp() {
  const navigate = useNavigate();

  // 현재 회원가입 단계
  const [currentStep, setCurrentStep] = useState<SignUpStep>('email-password');
  // 회원가입 데이터 관리
  const [signUpData, setSignUpData] = useState<IEmailPassword>({
    email: '',
    password: '',
  });

  // 회원가입 API 요청
  const signupMutation = useMutation({
    mutationFn: (profileData: IProfile) =>
      signupFetch({
        email: signUpData.email,
        password: signUpData.password,
        username: profileData.username,
        accountname: profileData.accountName,
        intro: profileData.intro,
        image: profileData.image,
      }),
    onSuccess: (data) => {
      console.log('회원가입 성공:', data);

      // 비밀번호는 즉시 메모리에서 제거
      setSignUpData((prev: IEmailPassword) => ({ ...prev, password: '' }));
      // 홈페이지로 이동
      navigate('/');
    },
    onError: () => {
      alert('회원가입 실패');
    },
  });

  // 이메일 단계 완료 핸들러
  const handleEmailStepComplete = (data: IEmailPassword) => {
    setSignUpData(data);
    setCurrentStep('profile');
  };

  // 프로필 설정 완료 핸들러
  const handleProfileComplete = (profileData: IProfile) => {
    // API 요청 실행
    signupMutation.mutate(profileData);
  };

  return (
    <>
      {/* 조건부 렌더링으로 현재 단계에 맞는 컴포넌트만 표시 */}
      {currentStep === 'email-password' && (
        <SignUpEmail onComplete={handleEmailStepComplete} />
      )}

      {currentStep === 'profile' && (
        <ProfileSetting onComplete={handleProfileComplete} />
      )}
    </>
  );
}

export default SignUp;
