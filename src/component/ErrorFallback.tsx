import ErrorIcon from '../assets/icon-error.svg';

interface ErrorFallbackProps {
    message?: string;
    onRetry?: () => void;
    heightClass?: string;
}

function ErrorFallback({
    message = "데이터를 불러오는 중 에러가 발생했습니다.",
    onRetry,
    heightClass,
}: ErrorFallbackProps) {
    let iconSize = "w-8 h-8";
    let titleSize = "text-lg";
    let messageSize = "text-xs";
    let marginIcon = "mb-2";
    let marginTitle = "mb-1";
    let marginMessage = "mb-2";
    let buttonSize = "px-3 py-1 text-xs";

    if (heightClass?.includes("220") || heightClass?.includes("240") || heightClass?.includes("322")) {
        iconSize = "w-16 h-16";
        titleSize = "text-2xl";
        messageSize = "text-base";
        marginIcon = "mb-4";
        marginTitle = "mb-2";
        marginMessage = "mb-6";
        buttonSize = "px-6 py-2 text-base";
    }

    const containerClass =
        'flex flex-col items-center justify-center w-full h-full ' +
        (heightClass ? heightClass : 'min-h-[120px]');

    return (
        <section className={containerClass}>
            <div className={`${marginIcon} animate-bounce`}>
                <img src={ErrorIcon} alt="에러 아이콘" className={iconSize} />
            </div>
            <span className={`${titleSize} font-bold text-red-500 ${marginTitle}`}>에러 발생!</span>
            <p className={`${messageSize} text-[#767676] ${marginMessage} text-center`}>{message}</p>
            {onRetry && (
                <button
                    className={`rounded-full bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition ${buttonSize}`}
                    onClick={onRetry}
                >
                    다시 시도하기
                </button>
            )}
        </section>
    );
}

export default ErrorFallback;
