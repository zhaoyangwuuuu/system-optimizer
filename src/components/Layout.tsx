import React, { PropsWithChildren } from "react";
import Sidebar from "./Sidebar";
import "../app/globals.css";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='flex-grow p-5'>{children}</main>
    </div>
  );
};

export default Layout;
