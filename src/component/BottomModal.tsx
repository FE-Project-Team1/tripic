function BottomModal() {
    return (
        <section className="fixed left-0 right-0 bottom-0 z-50 bg-white rounded-t-[10px] pt-4 pb-[10px] shadow-lg h-[138px] border border-gray-200">
            <div className="flex justify-center mb-4">
                <div className="w-[50px] h-1 rounded-full bg-gray-200" />
            </div>
            <ul>
                <li>
                    <button className="w-[390px] h-[46px] text-sm text-black text-left flex items-center py-[14px] pl-[26px]">
                        설정 및 개인정보
                    </button>
                </li>
                <li>
                    <button className="w-[390px] h-[46px] text-sm text-black text-left flex items-center py-[14px] pl-[26px]">
                        로그아웃
                    </button>
                </li>
            </ul>
        </section>
    );
}

export default BottomModal;
