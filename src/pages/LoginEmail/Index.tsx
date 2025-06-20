import { Link } from 'react-router-dom';
import CommonBtn from '../../component/CommonBtn';

interface IInput {
  name: string;
  text: string;
  type: string;
}

function CommonInput({ name, text, type }: IInput) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor={name} className="font-medium text-xs text-gray">
        {text}
      </label>
      <input
        id={name}
        type={type}
        className="h-7 border-b-[1px] border-light-gray"
      />
    </div>
  );
}

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
