import fullLogo02 from '../assets/fullLogo02.png';

function SplashScreen() {
  return (
    <section className="min-h-screen bg-white z-50 flex justify-center items-center">
      <div className="w-60 h-60 animate-fadeIn">
        <img
          src={fullLogo02}
          alt={fullLogo02}
          className="block w-full h-full"
        />
      </div>
    </section>
  );
}

export default SplashScreen;
