import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import ProfileSetting from './component/BeforeProfileSetting';
import SignUpEmail from './component/SignupEmail';
import { signupFetch } from '../../api/signupApi';
import type { IProfile } from '../../types/profileType';

// 회원가입 단계를 나타내는 타입
export type SignUpStep = 'email-password' | 'profile';

// 이메일/비밀번호 데이터 타입
export interface IEmailPassword {
  email: string;
  password: string;
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
    onError: (error) => {
      // 에러 객체에서 메시지 추출하여 표시
      if (error instanceof Error) {
        alert(`회원가입 실패: ${error.message}`);
      } else {
        alert('회원가입 실패: 알 수 없는 오류가 발생했습니다.');
      }
    },
  });

  // 이메일 단계 완료 핸들러
  const handleEmailStepComplete = (data: IEmailPassword) => {
    setSignUpData(data);
    setCurrentStep('profile');
  };

  // 프로필 설정 완료 핸들러
  const handleProfileComplete = (profileData: IProfile) => {
    // 전송할 데이터 로깅
    const finalSignupData = {
      email: signUpData.email,
      password: signUpData.password,
      username: profileData.username,
      accountname: profileData.accountName,
      intro: profileData.intro,
      image: profileData.image,
    };

    console.log('=== 회원가입 요청 데이터 ===');
    console.log('Email:', finalSignupData.email);
    console.log('Password length:', finalSignupData.password.length);
    console.log('Username:', finalSignupData.username);
    console.log('Account name:', finalSignupData.accountname);
    console.log('Intro:', finalSignupData.intro);
    console.log('Image:', finalSignupData.image);
    console.log('=== 전체 데이터 ===');
    console.log(JSON.stringify(finalSignupData, null, 2));

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
