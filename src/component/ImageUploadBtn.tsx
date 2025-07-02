import image from '../assets/image.svg';

interface IImageUploadBtn {
  handleImageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  position?: 'bottom-right-0' | 'bottom-right-3' | 'bottom-right-4';
}

function ImageUploadBtn({
  handleImageChange,
  position = 'bottom-right-0',
}: IImageUploadBtn) {
  const positionClasses = {
    'bottom-right-0': 'bottom-0 right-0',
    'bottom-right-3': 'bottom-3 right-3',
    'bottom-right-4': 'bottom-4 right-4',
  };

  return (
    <>
      <div
        className={`w-9 h-9 absolute bg-main rounded-[50%] flex justify-center items-center ${positionClasses[position]}`}
      >
        <img src={image} alt="image" className="w-[22px] h-[22px]" />
      </div>
      <input
        type="file"
        className={`opacity-0 w-9 h-9 absolute ${positionClasses[position]}`}
        onChange={handleImageChange}
      />
    </>
  );
}

export default ImageUploadBtn;
