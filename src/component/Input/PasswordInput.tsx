import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface IInput<T extends FieldValues = FieldValues> {
  name: Path<T>;
  text: string;
  type: string;
  register: UseFormRegister<T>;
  errorMessage?: string;
  required?: boolean;
}

function PasswordInput<T extends FieldValues = FieldValues>({
  name,
  text,
  type,
  register,
  errorMessage = '',
  required = false,
}: IInput<T>) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor={name} className="font-medium text-xs text-gray">
        {text}
      </label>
      <input
        id={name}
        type={type}
        className={`h-7 border-b-[1px] focus:border-main focus:outline-0 ${errorMessage ? 'border-red' : 'border-light-gray'}`}
        {...register(name, {
          required: required ? '필수 입력 값입니다.' : false,
          minLength: {
            value: 6,
            message: '비밀번호는 6자 이상이어야 합니다.',
          },
        })}
      />
      {errorMessage && (
        <p className="text-red text-xs leading-[14px] mt-[6px]">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default PasswordInput;
