import basicProfile from '../../assets/basic-profile.svg';
import chatroomImg from '../../assets/chatroom-img.png';

function ChatRoom() {
    return (
        <main className="min-h-screen px-4 pt-[296px] pb-[61px] bg-[#F2F2F2]">
        <ul>
            <li className="flex items-start gap-3 mb-[9px]">
            <img
                src={basicProfile}
                alt="상대방 프로필"
                className="w-[42px] h-[42px] rounded-full"
            />
            <div className="flex items-end gap-[6px]">
                <div
                className="w-[240px] box-border bg-white border border-[#C4C4C4]
                            px-3 py-3 rounded-[10px] rounded-tl-none text-black
                            text-[14px] leading-[100%] align-bottom break-words"
                >
                옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여,
                뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와 약동하다. 대고,
                못할 넣는 풍부하게 뛰노는 인생의 힘있다.
                </div>
                <span className="text-[10px] text-[#767676]">12:39</span>
            </div>
            </li>

            <li className="flex items-start gap-3 mb-[10px]">
            <img
                src={basicProfile}
                alt="상대방 프로필"
                className="w-[42px] h-[42px] rounded-full"
            />
            <div className="flex items-end gap-[6px]">
                <div
                className="w-[240px] box-border bg-white border border-[#C4C4C4]
                            px-3 py-3 rounded-[10px] rounded-tl-none text-black
                            text-[14px] leading-[100%] align-bottom break-words"
                >
                안녕하세요. 감귤 사고싶어요요요요요
                </div>
                <span className="text-[10px] text-[#767676]">12:41</span>
            </div>
            </li>

            <li className="flex justify-end mb-[10px]">
            <div className="flex items-end gap-[6px]">
                <span className="text-[10px] text-[#767676]">12:50</span>
                <div
                className="max-w-[240px] bg-[#F26E22] text-white
                            px-3 py-3 rounded-[10px] rounded-tr-none
                            text-[14px] leading-[100%] align-bottom break-words"
                >
                네 말씀하세요.
                </div>
            </div>
            </li>

            <li className="flex justify-end">
            <div className="flex items-end gap-[6px]">
                <span className="text-[10px] text-[#767676]">12:51</span>
                <img
                src={chatroomImg}
                alt="보낸 이미지"
                className="w-[240px] h-[240px] object-cover rounded-[10px]"
                />
            </div>
            </li>
        </ul>
        </main>
    );
}

export default ChatRoom;
