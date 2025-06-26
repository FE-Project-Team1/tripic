interface ICommonBtn {
  text: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'large' | 'medium' | 'small';
  onClick?: () => void;
}

function CommonBtn({
  text,
  disabled = false,
  type = 'button',
  size = 'large',
  onClick,
}: ICommonBtn) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full ${size === 'large' ? 'h-11' : size === 'medium' ? 'h-[34px]' : ''} rounded-[44px] text-white font-medium text-sm ${disabled ? 'bg-[#FFC7A7]' : 'bg-main'}`}
      onClick={onClick && onClick}
    >
      {text}
    </button>
  );
}

export default CommonBtn;
