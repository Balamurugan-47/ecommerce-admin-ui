import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import UserRole from "./pages/UserRole";
import Product from "./pages/Product";
import Order from "./pages/Order";
import Tenants from "./pages/Tenants";
import Menu from "./pages/Menu";

import MainLayout from "./layouts/MainLayout";
import { AuthProvider, useAuth } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated
    ? children
    : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/user-role" element={<UserRole />} />
          <Route path="/product" element={<Product />} />
          <Route path="/order" element={<Order />} />
          <Route path="/tenant" element={<Tenants />} />
          <Route path="/menu" element={<Menu />} />
        </Route>

      </Routes>

    </AuthProvider>
  );
}

export default App;