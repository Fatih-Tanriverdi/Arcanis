import { Routes, Route } from "react-router-dom";
import AdminPanel from "./pages/admin/AdminPanel";
import UsersList from "./pages/admin-users/UsersList";
import MainPage from "./pages/admin-main/MainPage";
import PlanetsAdmin from "./pages/admin-planets/PlanetsAdmin"
import SpaceShips from "./pages/admin-space-ships/SpaceShips";
import Customer from "./pages/customer/Customer";
import Ticket from "./pages/ticket/Ticket";
import Planets from "./pages/planets/Planets";
import About from "./pages/about/About";
import Iletisim from "./pages/communication/Iletisim";
import PlanetDetails from "./pages/planet-details/PlanetDetails";
import Expedition from "./pages/expedition/Expedition";
import TicketAdmin from "./pages/admin-ticket/TicketAdmin";
import NotFoundPage from "./pages/not-found/NotFound";
import PasswordResetScreen from "./pages/password-reset/PasswordResetScreen";
import MyTicket from "./pages/my-ticket/my-ticket";

export default function App() {

  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<Customer />}>
        <Route path="about" element={<About />} />
        <Route path="ticket" element={<Ticket />} />
        <Route path="communication" element={<Iletisim />} />
        <Route path="myticket" element={<MyTicket />} />
        <Route path="planets" element={<Planets />} />
        <Route path="/planet/:id" element={<PlanetDetails />} />
        <Route path="/reset-password/:recoveryCode" element={<PasswordResetScreen />} />
      </Route>
      <Route path="admin" element={<AdminPanel />}>
        <Route path="userlist" element={<UsersList />} />
        <Route path="spaceships" element={<SpaceShips />} />
        <Route path="mainpage" element={<MainPage />} />
        <Route path="planetsadmin" element={<PlanetsAdmin />} />
        <Route path="expedition" element={<Expedition />} />
        <Route path="ticketadmin" element={<TicketAdmin />} />
      </Route>
    </Routes>
  );
}