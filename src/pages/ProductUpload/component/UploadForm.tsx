import { useForm } from 'react-hook-form';
import FormInput from '../../../component/FormInput';
import ImageUploadBtn from '../../../component/ImageUploadBtn';

function UplaodForm() {
  const { register } = useForm();

  return (
    <form className="pt-[30px] px-[34px] max-w-[640px]">
      <div>
        <h3 className="text-[12px] text-gray mb-[18px]">이미지 등록</h3>
        <div className="aspect-[322/204] bg-light-gray rounded-[10px] border-light-gray border-[1px] relative">
          <ImageUploadBtn position="bottom-right-3" />
        </div>
        <div className="mt-[30px]">
          <FormInput
            name="itemName"
            text="상품명"
            register={register}
            placeholder="2~15자 이내여야 합니다."
          />
          <FormInput
            name="price"
            text="가격"
            variant="number"
            register={register}
            placeholder="숫자만 입력 가능합니다."
          />
          <FormInput
            name="place"
            text="장소"
            register={register}
            placeholder="장소를 입력 해주세요."
          />
        </div>
      </div>
    </form>
  );
}

export default UplaodForm;
