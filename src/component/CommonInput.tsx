import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface IInput<T extends FieldValues = FieldValues> {
  name: Path<T>;
  text: string;
  type: string;
  register: UseFormRegister<T>;
  required?: boolean;
}

function CommonInput<T extends FieldValues = FieldValues>({
  name,
  text,
  type,
  register,
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
        className="h-7 border-b-[1px] border-light-gray"
        {...register(name, { required })}
      />
    </div>
  );
}

export default CommonInput;
