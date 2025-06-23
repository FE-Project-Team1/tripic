import defaultProfile from '../assets/default-profile.png';
import image from '../assets/image.svg';

interface IProfileImage {
  upload?: boolean;
}

function ProfileImage({ upload = false }: IProfileImage) {
  return (
    <div className="w-[110px] h-[110px] relative">
      <div className="w-[110px] h-[110px] rounded-[50%] border-light-gray">
        <img
          src={defaultProfile}
          alt="profile"
          className="block w-full h-full rounded-[50%]"
        />
      </div>
      {upload && (
        <>
          <div className="w-9 h-9 absolute bottom-0 right-0 bg-main rounded-[50%] flex justify-center items-center">
            <img src={image} alt="image" className="w-[22px] h-[22px]" />
          </div>
          <input
            type="file"
            className="opacity-0 w-9 h-9 absolute bottom-0 right-0"
          />
        </>
      )}
    </div>
  );
}

export default ProfileImage;
