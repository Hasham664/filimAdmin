'use client';
import { useState } from 'react';
import {
  FaHome,
  FaShoppingCart,
  FaUser,
  FaChartBar,
  FaSignOutAlt,
  FaBars,
  FaAngleDown,
} from 'react-icons/fa';
import Link from 'next/link';

const menuItems = [
  {
    label: 'Pages',
    icon: <FaHome size={20} className='mr-3 text-gray-700' />,
    link: '/',
    subMenu: [
      {
        label: 'Home',
        link: '/hero',
        icon: <FaHome size={16} className='mr-2' />,
      },
      {
        label: 'Services',
        link: '/services',
        icon: <FaHome size={16} className='mr-2' />,
      },
      {
        label: 'Studio',
        link: '/studio',
        icon: <FaHome size={16} className='mr-2' />,
      },
      {
        label: 'Festival',
        link: '/festival',
        icon: <FaHome size={16} className='mr-2' />,
      },
      {
        label: 'News',
        link: '/news',
        icon: <FaHome size={16} className='mr-2' />,
      },
      {
        label: 'Contact',
        link: '/contact',
        icon: <FaHome size={16} className='mr-2' />,
      },
    ],
  },
  {
    label: 'Menu',
    icon: <FaShoppingCart size={20} className='mr-3 text-gray-700' />,
    link: '/menu',
    subMenu: [], // no sub-menu, so should route
  },
  {
    label: 'Blogs',
    icon: <FaShoppingCart size={20} className='mr-3 text-gray-700' />,
    link: '/blog',
    subMenu: [], // no sub-menu, so should route
  },
  {
    label: 'Logout',
    icon: <FaSignOutAlt size={20} className='mr-3 text-gray-700' />,
    link: '/logout',
    subMenu: [], // no sub-menu, so should route
  },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  // Store open/close state for submenus keyed by menu label
  const [openMenus, setOpenMenus] = useState({});

  const toggleSubMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div
      className={`${
        isOpen ? 'w-56' : 'w-20'
      } transition-width duration-300 border-r min-h-screen fixed flex flex-col bg-white`}
    >
      {/* Sidebar Header */}
      <div className='p-4 flex items-center justify-between'>
        <h1
          className={`text-xl font-bold transition-all duration-300 ${
            !isOpen && 'hidden'
          }`}
        >
          Dashboard
        </h1>
        <button className='text-black cursor-pointer' onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className='mt-4 flex-1 overflow-y-auto'>
        {menuItems.map((menu) => (
          <div key={menu.label}>
            {menu.subMenu && menu.subMenu.length > 0 ? (
              // If submenu exists, clicking toggles the submenu
              <div
                className='flex items-center px-4 py-2 hover:bg-blue-500 group cursor-pointer'
                onClick={() => toggleSubMenu(menu.label)}
              >
                {menu.icon}
                <span
                  className={`text-gray-700 group-hover:text-white transition-all duration-300 ${
                    !isOpen && 'hidden'
                  }`}
                >
                  {menu.label}
                </span>
                {isOpen && (
                  <FaAngleDown
                    className={`ml-auto transition-transform duration-300 ${
                      openMenus[menu.label] ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </div>
            ) : (
              // If no submenu, wrap the item with Link for navigation
              <Link href={menu.link}>
                <div className='flex items-center px-4 py-2 hover:bg-blue-500 group cursor-pointer'>
                  {menu.icon}
                  <span
                    className={`text-gray-700 group-hover:text-white transition-all duration-300 ${
                      !isOpen && 'hidden'
                    }`}
                  >
                    {menu.label}
                  </span>
                </div>
              </Link>
            )}

            {/* Render submenu if it exists */}
            {menu.subMenu && menu.subMenu.length > 0 && (
              <div
                className={`ml-8 overflow-hidden transition-all duration-300 ${
                  openMenus[menu.label] ? 'max-h-96' : 'max-h-0'
                }`}
              >
                {menu.subMenu.map((sub) => (
                  <Link key={sub.label} href={sub.link}>
                    <div className='flex items-center px-4 py-2 hover:bg-blue-400 group'>
                      {sub.icon}
                      <span className='text-gray-700 group-hover:text-white transition-all duration-300'>
                        {sub.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
