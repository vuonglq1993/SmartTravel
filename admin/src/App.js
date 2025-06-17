import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import TourManagement from "./pages/TourManagement";
import BookingManagement from "./pages/BookingManagement";
import StateManagement from "./pages/StateManagement";
import ReviewManagement from "./pages/ReviewManagement";
import Notifications from "./pages/Notifications";
import EmailForm from "./pages/EmailForm";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/LoginAdmin"; // <- chính là file Login bạn vừa gửi
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route login admin */}
          <Route path="/login" element={<Login />} />

          {/* Các route admin được bảo vệ */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <UserManagement />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/tours"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <TourManagement />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <BookingManagement />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/state"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <StateManagement />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <ReviewManagement />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/notifications"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <EmailForm />
                </AdminLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
