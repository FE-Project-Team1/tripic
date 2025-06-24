import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface IInput<T extends FieldValues = FieldValues> {
  name: Path<T>;
  text: string;
  type: string;
  register: UseFormRegister<T>;
  errorMessage?: string;
  successMessage?: string;
  required?: boolean;
  onValidateEmail?: (email: string) => void; // 이메일 검증 콜백 추가
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function EmailInput<T extends FieldValues = FieldValues>({
  name,
  text,
  type,
  register,
  errorMessage = '',
  successMessage = '',
  required = false,
  onValidateEmail,
}: IInput<T>) {

  const displayErrorMessage =
    successMessage === '이미 가입된 이메일 주소 입니다.'
      ? successMessage
      : errorMessage;

  const displaySuccessMessage =
    successMessage === '이미 가입된 이메일 주소 입니다.' ? '' : successMessage;


  const { onChange, onBlur, ref, ...rest } = register(name, {
    required,
    pattern: {
      value: emailRegex,
      message: '올바른 이메일 형식이 아닙니다.',
    },
  });

  // 커스텀 blur 핸들러
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // 기존 onBlur 실행
    onBlur(e);

    // 이메일 형식 검사
    const value = e.target.value;

    // 형식이 유효하고 콜백이 존재하면 API 검증 수행
    if (value && emailRegex.test(value) && onValidateEmail) {
      onValidateEmail(value);
    }
  };

  return (
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor={name} className="font-medium text-xs text-gray">
        {text}
      </label>
      <input
        id={name}
        type={type}
        className={`h-7 border-b-[1px] focus:border-main focus:outline-0 ${errorMessage ? 'border-red' : 'border-light-gray'}`}
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

export default EmailInput;
