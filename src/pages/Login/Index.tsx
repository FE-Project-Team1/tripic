import { Link } from 'react-router-dom';
import whiteSymbolLogo from '../../assets/white-symbol-logo.svg';
import facebook from '../../assets/facebook.svg';
import google from '../../assets/google.svg';
import kakao from '../../assets/kakao.svg';

interface ISocialLogin {
  borderColor: string;
  text: string;
  svg: string;
}

function SocialLoginBtn({ svg, text, borderColor }: ISocialLogin) {
  return (
    <li className="h-11">
      <a
        href=""
        className={`w-full h-full  pl-[14px] rounded-[44px] flex items-center relative border-[1px] ${borderColor}`}
      >
        <img src={svg} alt={text} className="w-6 h-6" />
        <p className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-light text-sm">
          {text}
        </p>
      </a>
    </li>
  );
}

function Login() {
  return (
    <section className="min-h-screen bg-main relative">
      <h1 className="sr-only">로그인 페이지</h1>
      <div className="w-36 h-36 absolute top-[35%] -translate-y-[35%] left-[50%] -translate-x-[50%]">
        <img src={whiteSymbolLogo} alt="로고" className="block w-full h-full" />
      </div>
      <div className="bg-white rounded-t-[20px] px-[34px] py-[50px] rounded-t-5 w-full absolute bottom-0 left-0">
        <ul className="flex flex-col gap-[10px]">
          <SocialLoginBtn
            svg={kakao}
            text={'카카오톡 계정으로 로그인'}
            borderColor="border-yellow"
          />
          <SocialLoginBtn
            svg={google}
            text={'구글 계정으로 로그인'}
            borderColor="border-gray"
          />
          <SocialLoginBtn
            svg={facebook}
            text={'페이스북 계정으로 로그인'}
            borderColor="border-blue"
          />
        </ul>
        <ul className="flex items-center mt-5 justify-center">
          <li>
            <Link to="" className="text-xs font-light text-gray">
              이메일로 로그인
            </Link>
          </li>
          <li className="w-[1px] h-[10px] bg-light-gray-02 mx-[14px]"></li>
          <li>
            <Link to="" className="text-xs font-light text-gray">
              회원가입
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Login;
