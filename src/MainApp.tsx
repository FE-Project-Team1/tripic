import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Index';
import Login from './pages/Login/Index';
import LoginEmail from './pages/LoginEmail/Index';
import Profile from './pages/Profile/Index';
import SignUp from './pages/SignUp/Index';
import Follow from './pages/Follow/Index';
import Chat from './pages/Chat/Index';
import Post from './pages/Post/Index';

function MainApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/email" element={<LoginEmail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/followers" element={<Follow />} />
        <Route path="/profile/following" element={<Follow />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainApp;
