import { useEffect, useRef } from 'react';
import LoadingIcon from '../assets/icon-loading.svg';

function Loading() {
    const spinnerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (spinnerRef.current) {
            spinnerRef.current.animate(
                [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
                {
                    duration: 1000,
                    iterations: Infinity,
                    easing: 'linear',
                }
            );
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-orange-100 to-white">
            <div
                ref={spinnerRef}
                className="w-16 h-16 mb-4 flex items-center justify-center"
            >
                <img src={LoadingIcon} alt="로딩 스피너" />
            </div>
            <span className="text-2xl font-bold text-orange-500 mb-2 animate-pulse">Loading...</span>
            <p className="text-sm text-[#767676]">로딩중입니다. 잠시만 기다려주세요!</p>
        </div>
    );
}

export default Loading;
