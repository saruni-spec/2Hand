import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ReactQueryProvider from "./utils/Provider";

const Layout = React.memo(function Layout() {
  const nav = useMemo(() => <Nav />, []);
  const footer = useMemo(() => <Footer />, []);

  return (
    <ReactQueryProvider>
      {nav}
      <div className="homeDiv">
        <Outlet />
        {footer}
      </div>
    </ReactQueryProvider>
  );
});

export default Layout;
