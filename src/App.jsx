import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Product from "./pages/Product";
import Order from "./pages/Order";
import Tenant from "./pages/Tenant";
import Menu from "./pages/Menu";

import MainLayout from "./layouts/MainLayout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Role from "./pages/Role";

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
          <Route path="/user-role" element={<Role />} />
          <Route path="/product" element={<Product />} />
          <Route path="/order" element={<Order />} />
          <Route path="/tenant" element={<Tenant />} />
          <Route path="/menu" element={<Menu />} />
        </Route>

      </Routes>

    </AuthProvider>
  );
}

export default App;