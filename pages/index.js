'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/globals.css';

export default function Home() {
  const router = useRouter();
  const [storeName, setStoreName] = useState('');
  const [storeId, setStoreId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const id = sessionStorage.getItem('storeId');
    const name = sessionStorage.getItem('storeName');
    if (id && name) {
      setStoreId(id);
      setStoreName(name);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <div className="bg-emerald-900 min-h-screen flex flex-col items-center justify-center text-white px-4 text-center">
      {isLoggedIn ? (
        <>
          <div>Logged in as {storeName}</div>
          <div>Store ID: {storeId}</div>
          <button
            onClick={handleLogout}
            className="bg-red-500 py-2 px-4 rounded-lg mt-4"
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">Welcome to the Store Portal</h1>
          <button
            onClick={handleLogin}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg"
          >
            Login
          </button>
        </>
      )}

      {/* 📢 Disclaimer */}
      <div className="mt-10 max-w-lg text-xs text-gray-300 bg-emerald-800 p-4 rounded-lg shadow-inner">
        <p>
          <strong>Disclaimer:</strong> This application is an experimental project created for learning and demonstration purposes only.
          All product data, images, and branding belong to their respective owners.
        </p>
        <p className="mt-2">
          The original product source is <a href="https://www.cedarsfoods.com" target="_blank" rel="noopener noreferrer" className="underline text-gray-100">www.cedarsfoods.com</a>. This project is not affiliated with or endorsed by Cedars Foods.
        </p>
      </div>
    </div>
  );
}
