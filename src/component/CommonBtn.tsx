interface ICommonBtn {
  text: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

function CommonBtn({ text, disabled = false, type = 'button' }: ICommonBtn) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full h-11 rounded-[44px] text-white font-medium text-sm ${disabled ? 'bg-[#FFC7A7]' : 'bg-main'}`}
    >
      {text}
    </button>
  );
}

export default CommonBtn;
