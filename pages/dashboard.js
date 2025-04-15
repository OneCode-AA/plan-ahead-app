'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../styles/globals.css';
import Header from '@/components/Header';
import Main from '@/components/Main';

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const [storeId, setStoreId] = useState('');
  const [storeName, setStoreName] = useState('');
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const router = useRouter();

  const toggleCartVisibility = () => {
    setIsCartVisible((prev) => !prev);
  };

  useEffect(() => {
    const username = sessionStorage.getItem('userName');
    const storedStoreId = sessionStorage.getItem('storeId');
    const storedStoreName = sessionStorage.getItem('storeName');

    if (!username || !storedStoreId) {
      router.push('/login');
    } else {
      setUserName(username);
      setStoreId(storedStoreId);
      setStoreName(storedStoreName);
    }
  }, [router]);

  return (
    <section className="min-h-screen min-w-screen">
      <div className="p-10">
        <h1 className="text-2xl font-bold">Welcome, {storeName}!</h1>
      </div>
      <div className="flex items-center px-10">
        <Image src="/globe.svg" alt="Store Icon" width={100} height={100} />
        <span className="px-2 text-lg font-semibold">{userName}</span>
      </div>
      <Header
        toggleCartVisibility={toggleCartVisibility}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
      <Main
        storeId={storeId}
        isCartVisible={isCartVisible}
        selectedCategory={selectedCategory}
        selectedSize={selectedSize}
      />
    </section>
  );
}