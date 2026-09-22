import { useState } from "react";
import { Check } from "lucide-react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";

const defaultProfile = {
  username: "aether",
  fullName: "Aether Traveler",
  email: "traveler@teyvat.ph",
  address:
    "Delivery pin near Kalayaan Avenue, Diliman, Quezon City, Philippines",
  position: [14.6507, 121.0494],
};
function Protected({ user, children }) {
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notice, setNotice] = useState("");
  const add = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing
        ? current.map((item) =>
            item.id === product.id
              ? { ...item, qty: Math.min(item.qty + 1, product.stock) }
              : item,
          )
        : [...current, { ...product, qty: 1 }];
    });
    setNotice(`${product.name} added to your bag`);
    window.setTimeout(() => setNotice(""), 2600);
  };
  const change = (id, amount) =>
    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: Math.max(1, Math.min(item.stock, item.qty + amount)),
            }
          : item,
      ),
    );
  const completeOrder = (order) => {
    setOrders((current) => [
      {
        ...order,
        id: `TYV-${String(current.length + 1).padStart(4, "0")}`,
        date: new Intl.DateTimeFormat("en-PH", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(new Date()),
        status: "Preparing your order",
      },
      ...current,
    ]);
    setCart([]);
  };
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const logout = () => {
    setUser(null);
    setCart([]);
    setOrders([]);
  };
  return (
    <>
      <Navbar user={user} cartCount={cartCount} onLogout={logout} />
      {notice && (
        <div className="bag-toast" role="status">
          <Check size={17} />
          {notice}
          <Link to="/cart">View bag</Link>
        </div>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <AuthPage
              mode="login"
              onAuth={setUser}
              defaultProfile={defaultProfile}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <AuthPage
              mode="signup"
              onAuth={setUser}
              defaultProfile={defaultProfile}
            />
          }
        />
        <Route
          path="/shop"
          element={
            <Protected user={user}>
              <ShopPage onAdd={add} />
            </Protected>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Protected user={user}>
              <ProductDetailPage onAdd={add} />
            </Protected>
          }
        />
        <Route
          path="/cart"
          element={
            <Protected user={user}>
              <CartPage
                cart={cart}
                change={change}
                remove={(id) =>
                  setCart((current) => current.filter((item) => item.id !== id))
                }
              />
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected user={user}>
              <ProfilePage user={user} onUpdate={setUser} orders={orders} />
            </Protected>
          }
        />
        <Route
          path="/checkout"
          element={
            <Protected user={user}>
              <CheckoutPage cart={cart} user={user} onDone={completeOrder} />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
