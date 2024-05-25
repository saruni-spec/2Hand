import Feed from "./pages/Feed";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import AddItem from "./pages/AddItem";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Contact from "./pages/contact";
import About from "./pages/About";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:filterType/:filterValue" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
