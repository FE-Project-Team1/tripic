interface ModalItem {
    label: string;
    onClick?: () => void;
}

interface BottomModalProps {
    items: ModalItem[];
}

function BottomModal({ items }: BottomModalProps) {
    return (
        <section
        role="dialog"
        aria-modal="true"
        className="fixed left-0 right-0 bottom-0 z-50 bg-white rounded-t-[10px] pt-4 pb-[10px] shadow-lg border border-gray-200"
        >
        <div className="flex justify-center mb-4">
            <div className="w-[50px] h-1 rounded-full bg-gray-200" />
        </div>
        <ul>
            {items.map((item, idx) => (
            <li key={`${item.label}-${idx}`}>
                <button
                className="w-full h-[46px] text-sm text-black text-left flex items-center py-[14px] pl-[26px]"
                onClick={item.onClick}
                >
                {item.label}
                </button>
            </li>
            ))}
        </ul>
        </section>
    );
}

export default BottomModal;
