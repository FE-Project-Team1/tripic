import ErrorIcon from '../assets/icon-error.svg';

interface ErrorFallbackProps {
    message?: string;
    onRetry?: () => void;
}

function ErrorFallback({
    message = "데이터를 불러오는 중 에러가 발생했습니다.",
    onRetry,
}: ErrorFallbackProps) {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-100 to-white">
            <div className="mb-4 animate-bounce">
                <img src={ErrorIcon} alt="에러 아이콘" />
            </div>
            <span className="text-2xl font-bold text-red-500 mb-2">에러 발생!</span>
            <p className="text-base text-[#767676] mb-6">{message}</p>
            {onRetry && (
                <button
                    className="px-6 py-2 rounded-full bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition"
                    onClick={onRetry}
                >
                    다시 시도하기
                </button>
            )}
        </section>
    );
}

export default ErrorFallback;
