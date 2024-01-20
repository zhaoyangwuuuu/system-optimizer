import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Sidebar: React.FC = () => {
  return (
    <div
      className='w-64 h-screen shadow-md p-5 border-r border-custom-divider'
      style={{ backgroundColor: "rgb(var(--background-color))" }}
    >
      <ul className='flex flex-col h-full'>
        <li className='mb-4'>
          <Link href='/resources'>
            <div className='block p-2 hover:bg-stone-700 rounded'>
              Resources
            </div>
          </Link>
        </li>
        <li className='mb-4'>
          <Link href='/startup-apps'>
            <div className='block p-2 hover:bg-stone-700 rounded'>
              Startup Apps
            </div>
          </Link>
        </li>
        <li className='mb-4'>
          <Link href='/system-cleaner'>
            <div className='block p-2 hover:bg-stone-700 rounded'>
              System Cleaner
            </div>
          </Link>
        </li>
        <li className='mb-4'>
          <Link href='/processes'>
            <div className='block p-2 hover:bg-stone-700 rounded'>
              Processes
            </div>
          </Link>
        </li>
        <li className='mb-4 mt-auto'>
          <Link href='/preference'>
            <div className='block p-2 hover:bg-stone-700 rounded'>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
