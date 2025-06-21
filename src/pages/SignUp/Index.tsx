import CommonInput from '../../component/CommonInput';
import CommonBtn from '../../component/CommonBtn';

function SignUp() {
  return (
    <section className="pt-[30px] px-[34px]">
      <h1 className="text-center font-medium text-2xl mb-10">
        이메일로 회원가입
      </h1>
      <form>
        <CommonInput name="email" text="이메일" type="text" />
        <CommonInput name="password" text="비밀번호" type="password" />
        <div className="mt-8">
          <CommonBtn text="다음" type="submit" />
        </div>
      </form>
    </section>
  );
}

export default SignUp;
