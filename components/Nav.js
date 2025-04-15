import { House, Logout } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function Nav() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem('cartItems'); 
    localStorage.removeItem('selectedCategory');
    localStorage.removeItem('selectedSize');
    router.push('/login');
  };

  return (
    <nav className=" p-4 flex items-center gap-4">
      <Link href="/" className="flex items-center gap-1 text-emerald-500 hover:text-emerald-300">
        <House />
        <span className="hidden sm:inline">Home</span>
      </Link>
      <button
        onClick={handleLogout}
        className="flex items-center gap-1 text-emerald-500 hover:text-emerald-300"
      >
        <Logout />
        <span className="hidden sm:inline">Log Out</span>
      </button>
    </nav>
  );
}

export default Nav;
