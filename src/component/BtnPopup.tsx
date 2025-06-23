function BtnPopup() {
    return (
        <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            <div className="w-[252px] h-[110px] bg-white rounded-[10px] flex flex-col justify-between shadow-lg">
                <div className="flex-1 flex items-center justify-center">
                <h2 className="text-base font-medium text-center">
                    로그아웃하시겠어요?
                </h2>
                </div>

                <div
                    className="flex h-[46px]"
                    style={{ borderTop: '0.5px solid #dbdbdb' }}
                >
                    <button
                        type="button"
                        className="w-1/2 h-full text-sm text-black bg-white rounded-bl-[10px] leading-none p-0"
                        style={{ borderRight: '0.5px solid #dbdbdb' }}
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        className="w-1/2 h-full text-sm text-[color:var(--color-main)] bg-white rounded-br-[10px] font-medium leading-none p-0"
                    >
                        로그아웃
                    </button>
                </div>
            </div>
        </section>
    );
}

export default BtnPopup;
