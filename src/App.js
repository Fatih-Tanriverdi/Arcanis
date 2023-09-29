import UserLogin from "./pages/Login/UserLogin";
import Register from "./pages/Register/Register";
import RecoverPassword from "./pages/PasswordReset/RecoverPassword";
import { Routes, Route } from "react-router-dom";
import AdminPanel from "./pages/Admin/AdminPanel";
import UsersList from "./pages/Users/UsersList";
import MainPage from "./pages/Main/MainPage";
import Orders from "./pages/Orders/Orders";
import SpaceShips from "./pages/Products/SpaceShips";

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recoverpassword" element={<RecoverPassword />} />
      <Route path="admin/*" element={<AdminPanel />}>
        <Route path="userlist" element={<UsersList />} />
        <Route path="spaceships" element={<SpaceShips />} />
        <Route path="mainpage" element={<MainPage />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}