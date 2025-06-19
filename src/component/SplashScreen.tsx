import fullLogo from '../assets/full-logo.svg';

function SplashScreen() {
  return (
    <section className="min-h-screen bg-white z-50 flex justify-center items-center">
      <div className="w-50 h-50 animate-fadeIn">
        <img src={fullLogo} alt={fullLogo} className="block w-full h-full" />
      </div>
    </section>
  );
}

export default SplashScreen;
