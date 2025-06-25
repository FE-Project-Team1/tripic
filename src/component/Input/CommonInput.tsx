import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface IInput<T extends FieldValues = FieldValues> {
  name: Path<T>;
  text: string;
  type: string;
  register: UseFormRegister<T>;
  errorMessage?: string;
  successMessage?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

function CommonInput<T extends FieldValues = FieldValues>({
  name,
  text,
  type,
  register,
  errorMessage = '',
  required = false,
  minLength,
  maxLength,
}: IInput<T>) {
  const registerOptions = {
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

  return (
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor={name} className="font-medium text-xs text-gray">
        {text}
      </label>
      <input
        id={name}
        type={type}
        className={`h-7 border-b-[1px] focus:border-main focus:outline-0 ${errorMessage ? 'border-red' : 'border-light-gray'}`}
        {...register(name, registerOptions)}
      />
      {errorMessage && (
        <p className="text-red text-xs leading-[14px] mt-[6px]">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default CommonInput;
