import React, { ReactNode } from "react";
import Nav from "./Nav";
// import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="bg-paleorange min-h-screen">
    {/* <Navbar /> */}
    <Nav />
    <div>{props.children}</div>
  </div>
);

export default Layout;
