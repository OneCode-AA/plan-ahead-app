'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Main from '@/components/Main';

function Dashboard() {
  const [userName, setUserName] = useState('');
  const [storeId, setStoreId] = useState('');
  const [storeName, setStoreName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const username = sessionStorage.getItem('userName');
    const storedStoreId = sessionStorage.getItem('storeId');
    const storedStoreName = sessionStorage.getItem('storeName');

    if (!username || !storedStoreId) {
      router.push('/login'); // Redirect if not logged in
    } else {
      setUserName(username);
      setStoreId(storedStoreId);
      setStoreName(storedStoreName);
    }
  }, [router]);

  return (
    <section>
      <div className="p-10">
        <h1 className="text-2xl font-bold">Welcome, {storeName}!</h1> {/* ✅ Display store name */}
      </div>
      <div className="flex items-center px-10">
        <Image src="/earth-icon.svg" alt="Store Icon" width={100} height={100} />
        <span className="px-2 text-lg font-semibold">{userName}</span>
      </div>
      <Header />
      <Main storeId={storeId} /> {/* ✅ Pass storeId to Main */}
    </section>
  );
}

export default Dashboard;
