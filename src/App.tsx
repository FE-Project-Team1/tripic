import { useState, useEffect } from 'react';
import SplashScreen from './component/SplashScreen';
import MainApp from './MainApp';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // 스플래시 화면을 2초 동안 표시 후 메인 앱으로 전환
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return <>{showSplash ? <SplashScreen /> : <MainApp />}</>;
}

export default App;
