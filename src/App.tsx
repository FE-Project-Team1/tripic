import { useState, useEffect } from 'react';
import SplashScreen from './component/SplashScreen';
import MainApp from './MainApp';

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    return sessionStorage.getItem('hasVisited') !== 'true';
  });

  useEffect(() => {
    if (showSplash) {
      // 방문 기록 저장
      sessionStorage.setItem('hasVisited', 'true');

      // 스플래시 화면 표시 후 전환
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 1000); // 시간을 조금 늘려서 스플래시 화면이 잘 보이게 함

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  return <>{showSplash ? <SplashScreen /> : <MainApp />}</>;
}

export default App;
