import { Routes, Route } from "react-router-dom";
import AdminPanel from "./pages/admin/AdminPanel";
import UsersList from "./pages/users/UsersList";
import MainPage from "./pages/main/MainPage";
import PlanetsAdmin from "./pages/planetsAdmin/PlanetsAdmin"
import SpaceShips from "./pages/spaceShips/SpaceShips";
import Customer from "./pages/customer/Customer";
import Ticket from "./pages/ticket/Ticket";
import Planets from "./pages/planets/Planets";
import About from "./pages/about/About";
import Iletisim from "./pages/communication/Iletisim";
import PlanetDetails from "./pages/planetDetails/PlanetDetails";
import Expedition from "./pages/expedition/Expedition";
import TicketAdmin from "./pages/ticketAdmin/TicketAdmin";

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Customer />}/>
      <Route path="/*" element={<Customer />} />
      <Route path="about" element={<About />} />
      <Route path="ticket" element={<Ticket />} />
      <Route path="iletisim" element={<Iletisim />} />
      <Route path="planets" element={<Planets />} />
      <Route path="/planet/:id" element={<PlanetDetails />} />
      <Route path="admin/*" element={<AdminPanel />}>
        <Route path="userlist" element={<UsersList />} />
        <Route path="spaceships" element={<SpaceShips />} />
        <Route path="mainpage" element={<MainPage />} />
        <Route path="planestadmin" element={<PlanetsAdmin />} />
        <Route path="expedition" element={<Expedition />} />
        <Route path="ticketadmin" element={<TicketAdmin />} />
      </Route>
    </Routes>
  );
}