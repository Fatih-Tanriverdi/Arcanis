import UserLogin from "./components/UserLogin";
import Register from "./components/Register";
import RecoverPassword from "./components/RecoverPassword";
import { Routes, Route, Link } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import UsersList from "./components/UsersList";
import UzayAracları from "./components/UzayAracları";



export default function App() {
  return (
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

  );
}

