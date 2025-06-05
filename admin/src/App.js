import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import TourManagement from "./pages/TourManagement";
import BookingManagement from "./pages/BookingManagement";
import StateManagement from "./pages/StateManagement";
import ReviewManagement from "./pages/ReviewManagement";
import Notifications from "./pages/Notifications";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <UserManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/tours"
          element={
            <AdminLayout>
              <TourManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <AdminLayout>
              <BookingManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/state"
          element={
            <AdminLayout>
              <StateManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <AdminLayout>
              <ReviewManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <AdminLayout>
              <Notifications />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
