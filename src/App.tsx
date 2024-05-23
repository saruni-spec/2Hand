import Feed from "./pages/Feed";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import AddItem from "./pages/AddItem";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/shop/" element={<Shop />} />
          <Route path="/shop/:filter" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
