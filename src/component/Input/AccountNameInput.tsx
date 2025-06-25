import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface IInput<T extends FieldValues = FieldValues> {
  name: Path<T>;
  text: string;
  type: string;
  register: UseFormRegister<T>;
  errorMessage?: string;
  successMessage?: string;
  required?: boolean;
  onValidateAccountName?: (accountName: string) => void;
}

function AccountNameInput<T extends FieldValues = FieldValues>({
  name,
  text,
  type,
  register,
  errorMessage = '',
  successMessage = '',
  required = false,
  onValidateAccountName,
}: IInput<T>) {
  const displayErrorMessage =
    successMessage === '이미 가입된 계정ID 입니다.'
      ? successMessage
      : errorMessage;

  const displaySuccessMessage =
    successMessage === '이미 가입된 계정ID 입니다.' ? '' : successMessage;

  // register에서 필요한 속성 추출
  const { onChange, onBlur, ref, ...rest } = register(name, {
    required: required ? '필수 입력 값입니다.' : false,
  });

  // 커스텀 blur 핸들러
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // 기존 onBlur 실행
    onBlur(e);

    // 계정명 값 가져오기
    const value = e.target.value;

    // 값이 있고 검증 함수가 제공되었다면 검증 호출
    if (value && onValidateAccountName) {
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
        type={type}
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

export default AccountNameInput;
