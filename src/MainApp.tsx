import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Home from './pages/Home/Index';
import Login from './pages/Login/Index';
import LoginEmail from './pages/LoginEmail/Index';
import Search from './pages/Search/Index';
import Profile from './pages/Profile/Index';
import SignUp from './pages/SignUp/Index';
import Follow from './pages/Follow/Index';
import Chat from './pages/Chat/Index';
import Post from './pages/Post/Index';
import ChatRoom from './pages/ChatRoom/Index';
import { getCookie } from './utils/auth';
import ProfileModification from './pages/ProfieModification/Index';
import ProductUpload from './pages/ProductUpload/Index';

function AppRoutes() {
  const [hasToken, setHasToken] = useState(!!getCookie('token'));
  const location = useLocation();

  // 라우트 변경 시 토큰 상태를 다시 확인
  useEffect(() => {
    setHasToken(!!getCookie('token'));
  }, [location.pathname]);

  return (
    <Routes>
      <Route
        path="/"
        element={hasToken ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/login"
        element={hasToken ? <Navigate to="/" replace /> : <Login />}
      />
      <Route path="/login/email" element={<LoginEmail />} />
      <Route path="/search" element={<Search />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/followers" element={<Follow />} />
      <Route path="/profile/following" element={<Follow />} />
      <Route path="/profile/modification" element={<ProfileModification />} />
      <Route path="/profile/product-upload" element={<ProductUpload />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/room" element={<ChatRoom />} />
      <Route path="/post" element={<Post />} />
    </Routes>
  );
}

function MainApp() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default MainApp;
