import React, { useRef, useEffect } from "react";
import "../shop-menu.css";
import { useNavigate } from "react-router-dom";

interface MenuProps {
  setMenuVisible: (decision: boolean) => void;
}

const ShopMenu: React.FC<MenuProps> = ({ setMenuVisible }) => {
  const navigate = useNavigate();

  const menuRef = useRef<HTMLUListElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  return (
    <ul className="shop" ref={menuRef}>
      <li
        onClick={() => {
          navigate("/shop/type/pants");
        }}
      >
        Pants
      </li>
      <li
        onClick={() => {
          navigate("/shop/type/shirt");
        }}
      >
        Shirts
      </li>
      <li
        onClick={() => {
          navigate("/shop/type/skirt");
        }}
      >
        Skirts
      </li>
      <li
        onClick={() => {
          navigate("/shop/type/sweater");
        }}
      >
        Sweaters
      </li>
      <li
        onClick={() => {
          navigate("/shop/type/shoes");
        }}
      >
        Shoes
      </li>
      <li
        onClick={() => {
          navigate("/shop/type/sports");
        }}
      >
        Sports
      </li>

      <li
        onClick={() => {
          navigate("/shop/type/accessories");
        }}
      >
        Accessories
      </li>
    </ul>
  );
};

export default ShopMenu;
