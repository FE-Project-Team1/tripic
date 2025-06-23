import { useState } from 'react';
import ProfileSetting from './component/ProfileSetting';
import SignUpEmail from './component/SignupEmail';

// 회원가입 단계를 나타내는 타입
type SignUpStep = 'email-password' | 'profile';

// 회원가입 폼 데이터 타입
interface SignUpData {
  email: string;
  password: string;
}

function SignUp() {
  console.log('working');
  // 현재 회원가입 단계
  const [currentStep, setCurrentStep] = useState<SignUpStep>('email-password');

  // 회원가입 폼 데이터
  const [signUpData, setSignUpData] = useState<SignUpData>({
    email: '',
    password: '',
  });

  // 이메일/비밀번호 단계 완료 시 호출될 함수
  const handleEmailStepComplete = (data: SignUpData) => {
    // 폼 데이터 저장
    setSignUpData(data);

    // 프로필 설정 단계로 전환
    setCurrentStep('profile');
  };

  return (
    <>
      {/* 조건부 렌더링으로 현재 단계에 맞는 컴포넌트만 표시 */}
      {currentStep === 'email-password' && (
        <SignUpEmail onNext={handleEmailStepComplete} />
      )}

      {currentStep === 'profile' && (
        <ProfileSetting
          email={signUpData.email}
          password={signUpData.password}
        />
      )}
    </>
  );
}

export default SignUp;
