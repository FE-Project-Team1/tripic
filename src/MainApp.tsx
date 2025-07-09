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
import PostModification from './pages/PostModification/Index';
import { ModalProvider } from './context/ModalContext';

function AppRoutes() {
  const [hasToken, setHasToken] = useState(!!getCookie('token'));
  const location = useLocation();

  // 라우트 변경 시 토큰 상태를 다시 확인
  useEffect(() => {
    setHasToken(!!getCookie('token'));
  }, [location.pathname]);

  // 로그인이 필요한 페이지들을 보호하는 컴포넌트
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return hasToken ? <>{children}</> : <Navigate to="/login" replace />;
  };

  // 로그인 상태에서 접근하면 안 되는 페이지들을 보호하는 컴포넌트
  const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
    return hasToken ? <Navigate to="/" replace /> : <>{children}</>;
  };

  return (
    <Routes>
      {/* 로그인 상태: 홈으로, 비로그인 상태: 로그인으로 */}
      <Route
        path="/"
        element={hasToken ? <Home /> : <Navigate to="/login" replace />}
      />

      {/* 공개 페이지 (로그인 상태에서는 홈으로 리다이렉트) */}
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/login/email"
        element={
          <PublicOnlyRoute>
            <LoginEmail />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicOnlyRoute>
            <SignUp />
          </PublicOnlyRoute>
        }
      />

      {/* 보호된 페이지들 (로그인 필요) */}
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-profile"
        element={
          <ProtectedRoute>
            <MyProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-profile/followers"
        element={
          <ProtectedRoute>
            <Followers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-profile/followings"
        element={
          <ProtectedRoute>
            <Followings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-profile/modification"
        element={
          <ProtectedRoute>
            <ProfileModification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-profile/product-upload"
        element={
          <ProtectedRoute>
            <ProductUpload />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-profile/product-modification/:product-id"
        element={
          <ProtectedRoute>
            <ProductModification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/your-profile/:accountname"
        element={
          <ProtectedRoute>
            <YourProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat/room"
        element={
          <ProtectedRoute>
            <ChatRoom />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post/:postId"
        element={
          <ProtectedRoute>
            <Post />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post-upload"
        element={
          <ProtectedRoute>
            <PostUpload />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post-modification/:postId"
        element={
          <ProtectedRoute>
            <PostModification />
          </ProtectedRoute>
        }
      />

      {/* 404 페이지 */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

function MainApp() {
  return (
    <BrowserRouter basename="/tripic">
      <ModalProvider>
        <AppRoutes />
      </ModalProvider>
    </BrowserRouter>
  );
}

export default MainApp;
