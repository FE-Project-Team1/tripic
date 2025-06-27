import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';

// 입력 필드 유형 정의
type InputVariant = 'text' | 'email' | 'password' | 'accountName';

interface IFormInput<T extends FieldValues = FieldValues> {
  name: Path<T>;
  text: string;
  variant?: InputVariant;
  register: UseFormRegister<T>;
  errorMessage?: string;
  successMessage?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  onValidateEmail?: (email: string) => void;
  onValidateAccountName?: (accountName: string) => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function FormInput<T extends FieldValues = FieldValues>({
  name,
  text,
  variant = 'text',
  register,
  errorMessage = '',
  successMessage = '',
  required = false,
  minLength,
  maxLength,
  onValidateEmail,
  onValidateAccountName,
}: IFormInput<T>) {
  // variant에 따른 input type 자동 결정
  const getInputType = (): string => {
    switch (variant) {
      case 'email':
        return 'email';
      case 'password':
        return 'password';
      case 'text':
      case 'accountName':
      default:
        return 'text';
    }
  };

  const inputType = getInputType();
  // 각 variant별 특별한 에러/성공 메시지 처리
  const getDisplayMessages = () => {
    const isAlreadyRegistered =
      successMessage === '이미 가입된 이메일 주소 입니다.' ||
      successMessage === '이미 가입된 계정ID 입니다.';

    return {
      displayErrorMessage: isAlreadyRegistered ? successMessage : errorMessage,
      displaySuccessMessage: isAlreadyRegistered ? '' : successMessage,
    };
  };

  const { displayErrorMessage, displaySuccessMessage } = getDisplayMessages();

  // variant별 검증 규칙 생성
  const getValidationRules = () => {
    const baseRules = {
      required: required ? '필수 입력 값입니다.' : false,
      minLength: minLength
        ? {
            value: minLength,
            message: `최소 ${minLength}자 이상 작성하셔야 합니다.`,
          }
        : undefined,
      maxLength: maxLength
        ? {
            value: maxLength,
            message: `최대 ${maxLength}자 이상 작성하시면 안됩니다.`,
          }
        : undefined,
    };

    switch (variant) {
      case 'email':
        return {
          ...baseRules,
          pattern: {
            value: emailRegex,
            message: '올바른 이메일 형식이 아닙니다.',
          },
        };
      case 'password':
        return {
          ...baseRules,
          minLength: {
            value: 6,
            message: '비밀번호는 6자 이상이어야 합니다.',
          },
        };
      case 'accountName':
      case 'text':
      default:
        return baseRules;
    }
  };

  // 커스텀 핸들러가 필요한 경우 register 분해
  const needsCustomHandler = variant === 'email' || variant === 'accountName';

  if (!needsCustomHandler) {
    // 기본 사용법 (CommonInput, PasswordInput과 동일)
    return (
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor={name} className="font-medium text-xs text-gray">
          {text}
        </label>
        <input
          id={name}
          type={inputType}
          className={`h-7 border-b-[1px] focus:border-main focus:outline-0 ${
            errorMessage ? 'border-red' : 'border-light-gray'
          }`}
          {...register(name, getValidationRules())}
        />
        {displayErrorMessage && !displaySuccessMessage && (
          <p className="text-red text-xs leading-[14px] mt-[6px]">
            {displayErrorMessage}
          </p>
        )}
        {displaySuccessMessage && !displayErrorMessage && (
          <p className="text-green-400 text-xs leading-[14px] mt-[6px]">
            {displaySuccessMessage}
          </p>
        )}
      </div>
    );
  }

  // 커스텀 핸들러가 필요한 경우 (EmailInput, AccountNameInput과 동일)
  const { onChange, onBlur, ref, ...rest } = register(
    name,
    getValidationRules()
  );

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // 기존 onBlur 실행
    onBlur(e);

    const value = e.target.value;

    if (
      variant === 'email' &&
      value &&
      emailRegex.test(value) &&
      onValidateEmail
    ) {
      onValidateEmail(value);
    } else if (variant === 'accountName' && value && onValidateAccountName) {
      onValidateAccountName(value);
    }
  };

  return (
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor={name} className="font-medium text-xs text-gray">
        {text}
      </label>
      <input
        id={name}
        type={inputType}
        className={`h-7 border-b-[1px] focus:border-main focus:outline-0 ${
          errorMessage ? 'border-red' : 'border-light-gray'
        }`}
        onChange={onChange}
        onBlur={handleBlur}
        ref={ref}
        {...rest}
      />
      {displayErrorMessage && !displaySuccessMessage && (
        <p className="text-red text-xs leading-[14px] mt-[6px]">
          {displayErrorMessage}
        </p>
      )}
      {displaySuccessMessage && !displayErrorMessage && (
        <p className="text-green-400 text-xs leading-[14px] mt-[6px]">
          {displaySuccessMessage}
        </p>
      )}
    </div>
  );
}

export default FormInput;
