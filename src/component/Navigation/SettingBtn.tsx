import iconMore from '../../assets/icon- more-vertical.svg';

function SettingBtn() {
  return (
    <button className="w-6 h-6 flex justify-center items-center">
      <img src={iconMore} alt={iconMore} className="w-full h-full block" />
    </button>
  );
}

export default SettingBtn;
