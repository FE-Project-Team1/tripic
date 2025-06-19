import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Index';
import Login from './pages/Login/Index';

function MainApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainApp;
