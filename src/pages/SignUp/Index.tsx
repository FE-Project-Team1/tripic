import { useState } from 'react';
import ProfileSetting from './component/ProfileSetting';
import SignUpEmail from './component/SignupEmail';

// 회원가입 단계를 나타내는 타입
export type SignUpStep = 'email-password' | 'profile';

function SignUp() {
  console.log('working');
  // 현재 회원가입 단계
  const [currentStep, setCurrentStep] = useState<SignUpStep>('email-password');

  return (
    <>
      {/* 조건부 렌더링으로 현재 단계에 맞는 컴포넌트만 표시 */}
      {currentStep === 'email-password' && (
        <SignUpEmail setCurrentStep={setCurrentStep} />
      )}

      {currentStep === 'profile' && <ProfileSetting />}
    </>
  );
}

export default SignUp;
