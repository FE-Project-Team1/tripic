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
import MyProfile from './pages/MyProfile/Index';
import YourProfile from './pages/YourProfile/Index';
import SignUp from './pages/SignUp/Index';
import Chat from './pages/Chat/Index';
import Post from './pages/Post/Index';
import ChatRoom from './pages/ChatRoom/Index';
import { getCookie } from './utils/auth';
import ProfileModification from './pages/ProfieModification/Index';
import ProductUpload from './pages/ProductUpload/Index';
import PostUpload from './pages/PostUpload/Index';
import ErrorPage from './pages/404page';
import Followers from './pages/Followers/Index';
import Followings from './pages/Followings/Index';
import ProductModification from './pages/ProductModification/Index';

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
      <Route path="/my-profile" element={<MyProfile />} />
      <Route path="/my-profile/followers" element={<Followers />} />
      <Route path="/my-profile/followings" element={<Followings />} />
      <Route
        path="/my-profile/modification"
        element={<ProfileModification />}
      />
      <Route path="/my-profile/product-upload" element={<ProductUpload />} />
      <Route
        path="/my-profile/product-modification/:product-id"
        element={<ProductModification />}
      />
      <Route path="/your-profile/:accountname" element={<YourProfile />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/room" element={<ChatRoom />} />
      <Route path="/post" element={<Post />} />
      <Route path="/post-upload" element={<PostUpload />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

function MainApp() {
  return (
    <BrowserRouter basename="/tripic">
      <AppRoutes />
    </BrowserRouter>
  );
}

export default MainApp;
