import { BrowserRouter, Routes, Route } from "react-router-dom";

import ShopLayout from "./pages/ShopLayout";
import AdminLayout from "./admin/AdminLayout";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import AdminDashboard from "./admin/AdminDashboard";
import AdminOrders from "./admin/AdminOrders";
import OrderDetails from "./admin/OrderDetails";
import AdminAddProducts from "./admin/AdminAddProducts";
import AdminCollection from "./admin/AdminCollection";
import AdminEditProduct from "./admin/AdminEditProduct";
import Login from "./pages/Login";
import AdminRoute from "./admin/AdminRoute";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<ShopLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Shop />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/reset-password/:token" element={<ResetPassword/>} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
            } />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/edit-product/:id" element={<AdminEditProduct />} />
          <Route path="/admin/products" element={<AdminCollection />} />
          <Route path="/admin/add-product" element={<AdminAddProducts />} />
          <Route path="/admin/orders/:id" element={<OrderDetails />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;