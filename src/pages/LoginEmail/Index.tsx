import { Link } from 'react-router-dom';
import CommonBtn from '../../component/CommonBtn';
import CommonInput from '../../component/CommonInput';

function LoginEmail() {
  return (
    <section className="pt-[30px] px-[34px]">
      <h1 className="text-center font-medium text-2xl mb-10">로그인</h1>
      <form>
        <CommonInput name="email" text="이메일" type="text" />
        <CommonInput name="password" text="비밀번호" type="password" />
        <div className="mt-[30px]">
          <CommonBtn text={'로그인'} disabled={true} />
        </div>
      </form>
      <div className="mt-5 text-center">
        <Link to="" className="text-xs text-gray">
          이메일로 회원가입
        </Link>
      </div>
    </section>
  );
}

export default LoginEmail;
