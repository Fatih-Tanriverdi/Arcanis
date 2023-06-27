import UserLogin from "./components/UserLogin";
import Register from "./components/Register";
import RecoverPassword from "./components/RecoverPassword";
import { Routes, Route, Link } from "react-router-dom";



export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recoverpassword" element={<RecoverPassword />} />
      </Routes>
    </>

  );
}

