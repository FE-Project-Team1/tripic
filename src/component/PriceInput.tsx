import { NumericFormat } from 'react-number-format';
import type { UseFormSetValue, FieldValues, Path } from 'react-hook-form';

interface IPriceInput<T extends FieldValues = FieldValues> {
  name: Path<T>;
  text: string;
  value: number;
  setValue: UseFormSetValue<T>;
  errorMessage?: string;
  placeholder?: string;
}

function PriceInput<T extends FieldValues = FieldValues>({
  name,
  text,
  value,
  setValue,
  errorMessage = '',
  placeholder = '숫자만 입력 가능합니다.',
}: IPriceInput<T>) {
  return (
    <div className="flex flex-col gap-[10px] mb-4">
      <label htmlFor={name} className="font-medium text-xs text-gray">
        {text}
      </label>
      <NumericFormat
        id={name}
        value={value || ''}
        onValueChange={(values) => {
          setValue(name, (values.floatValue || 0) as T[Path<T>], {
            shouldValidate: true,
          });
        }}
        thousandSeparator=","
        placeholder={placeholder}
        className={`text-sm h-7 border-b-[1px] focus:border-main focus:outline-0 pb-2 placeholder:text-sm placeholder:text-light-gray ${
          errorMessage ? 'border-red' : 'border-light-gray'
        }`}
        allowNegative={false}
        decimalScale={0}
      />
      {errorMessage && (
        <p className="text-red text-xs leading-[14px] mt-[6px]">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default PriceInput;
