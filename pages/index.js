'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [storeName, setStoreName] = useState('');
  const [storeId, setStoreId] = useState('');

  useEffect(() => {
    const id = sessionStorage.getItem('storeId');
    const name = sessionStorage.getItem('storeName');
    if (!id) {
      router.push('/login');
    } else {
      setStoreId(id);
      setStoreName(name);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/login');
  };

  return (
    <div className="bg-blue-900 min-h-screen flex flex-col items-center justify-center text-white">
      <div>Logged in as {storeName}</div>
      <div>Store ID: {storeId}</div>
      <button onClick={handleLogout} className="bg-red-500 py-2 px-4 rounded-lg mt-4">
        Sign out
      </button>
    </div>
  );
}
