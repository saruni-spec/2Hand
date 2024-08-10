import { memo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./Layout";
import Feed from "./pages/Feed";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import AddItem from "./pages/AddItem";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Contact from "./pages/contact";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Terms from "./pages/Terms";
import UserProvider from "./context/UserContext";
import MakeDonations from "./pages/MakeDonations";

const App = memo(function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Feed />} />
              <Route path="shop" element={<Shop />} />
              <Route path="shop/:filterType/:filterValue" element={<Shop />} />
              <Route path="cart" element={<Cart />} />
              <Route path="add-item" element={<AddItem />} />
              <Route path="login" element={<Login />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<About />} />
              <Route path="profile" element={<Profile />} />
              <Route path="terms" element={<Terms />} />
              <Route path="donation" element={<MakeDonations />} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
});

export default App;
