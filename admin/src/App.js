import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import TourManagement from "./pages/TourManagement";
import BookingManagement from "./pages/BookingManagement";
import StateManagement from "./pages/StateManagement";
import ReviewManagement from "./pages/ReviewManagement";
import Notifications from "./pages/Notifications";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/tours" element={<TourManagement />} />
        <Route path="/admin/bookings" element={<BookingManagement />} />
        <Route path="/admin/state" element={<StateManagement />} />
        <Route path="/admin/reviews" element={<ReviewManagement />} />
        <Route path="/admin/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  );
}

export default App;
