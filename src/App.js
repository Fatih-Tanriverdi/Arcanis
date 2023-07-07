import UserLogin from "./components/UserLogin";
import Register from "./components/Register";
import RecoverPassword from "./components/RecoverPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import UsersList from "./websitepages/UsersList";
import MainPage from "./websitepages/MainPage";
import Orders from "./websitepages/Orders";
import SpaceShips from "./websitepages/SpaceShips";
import Modal from "./components/Modal";




export default function App() {
  return (
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
</>
*/