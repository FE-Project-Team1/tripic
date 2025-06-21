interface IInput {
  name: string;
  text: string;
  type: string;
}

function CommonInput({ name, text, type }: IInput) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor={name} className="font-medium text-xs text-gray">
        {text}
      </label>
      <input
        id={name}
        type={type}
        className="h-7 border-b-[1px] border-light-gray"
      />
    </div>
  );
}

export default CommonInput;
