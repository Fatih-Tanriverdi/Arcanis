import React from 'react';
import UserLogin from "./pages/userLogin/UserLogin";
import Register from "./pages/register/Register";
import RecoverPassword from "./pages/resetPassword/RecoverPassword";
import { Routes, Route } from "react-router-dom";
import AdminPanel from "./pages/admin/AdminPanel";
import UsersList from "./pages/userlist-page/UsersList";
import MainPage from "./pages/main/MainPage";
import Orders from "./pages/orders/Orders";
import SpaceShips from "./pages/rockets/SpaceShips";




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

/*  
<>
  <Routes>
    <Route path="/" element={<UserLogin />} />
    <Route path="/register" element={<Register />} />
    <Route path="/recoverpassword" element={<RecoverPassword />} />
    <Route path="/adminpanel" element={<AdminPanel />} />
    <Route path="/userlist" element={<UsersList />} />
    <Route path="/uzayaracları" element={<UzayAracları />} />
  </Routes>

  <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recoverpassword" element={<RecoverPassword />} />
      <Route path="admin" element={<AdminPanel />}>
        <Route path="userlist" element={<UsersList />} />
        <Route path="spaceships" element={<SpaceShips />} />
        <Route path="mainpage" element={<MainPage />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
</>
*/