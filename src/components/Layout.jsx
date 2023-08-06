import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";



function Layout({ children }) {

  return (
    <>
      <Navbar></Navbar>
      {children}
    </>
  );
}

export default Layout;
