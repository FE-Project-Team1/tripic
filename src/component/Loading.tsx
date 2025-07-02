import LoadingIcon from '../assets/icon-loading.svg';

interface LoadingProps {
  heightClass?: string;
}

function Loading({ heightClass }: LoadingProps) {

  const isSmall = !heightClass || heightClass.includes("120");

  let iconSize = isSmall ? "w-8 h-8 mb-2" : "w-16 h-16 mb-4";
  let textSize = isSmall ? "text-lg mb-1" : "text-2xl mb-2";
  let descSize = isSmall ? "text-xs" : "text-sm";

  const containerClass =
    'flex flex-col items-center justify-center w-full bg-white ' +
    (heightClass ? heightClass : 'min-h-[120px]');

  return (
    <div className={containerClass} aria-live="polite">
      <div className={`${iconSize} flex items-center justify-center`}>
        <img
          src={LoadingIcon}
          alt="로딩 스피너"
          className="w-full h-full animate-spin"
        />
      </div>
      <span
        className={`font-bold text-orange-500 animate-pulse ${textSize}`}
        role="status"
      >
        Loading...
      </span>
      <p className={`${descSize} text-[#767676]`}>
        로딩중입니다. 잠시만 기다려주세요!
      </p>
    </div>
  );
}

export default Loading;
