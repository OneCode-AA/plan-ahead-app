'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../styles/globals.css';
import Header from '@/components/Header';
import Main from '@/components/Main';

export default function Dashboard( ) {
  const [userName, setUserName] = useState('');
  const [storeId, setStoreId] = useState('');
  const [storeName, setStoreName] = useState('');
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const storeLogos = [
    {
     store: "lunds1",
     logoImg: '/lundslogo.svg'
    },
    {
      store: "fresh1",
     logoImg: '/freshthymelogo.png'
    },
    {
      store: "admin",
      logoImg: "/admin.jpg",
    }]

    const currentStoreLogo = storeLogos.find((logo) => logo.store === storeId);


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

  useEffect(() => {
    async function fetchProducts() {
      if (!storeId) return;
      const res = await fetch(`/api/products?storeId=${storeId}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    }
    fetchProducts();
  }, [storeId]);

  const filteredProducts = products
    .filter((product) => {
      const matchCategory = !selectedCategory || product.name === selectedCategory;
      const matchItems = product.items.filter(
        (item) =>
          (!selectedSize || item.size === selectedSize) &&
          item.storeId.includes(storeId)
      );
      return matchCategory && matchItems.length > 0;
    })
    .map((product) => ({
      ...product,
      items: product.items.filter(
        (item) =>
          (!selectedSize || item.size === selectedSize) &&
          item.storeId.includes(storeId)
      )
    }));

  return (
    <section className="min-h-screen w-screen">
      <div className="py-2 px-10 flex max-md:justify-center items-center">
        <h1 className="text-2xl font-bold">Welcome,</h1>
        <span className="text-lg font-semibold flex items-center px-2 gap-2">
          <Image src={currentStoreLogo?.logoImg || '/admin.jpg'} alt="Store Icon" width={100} height={100} />
          {storeName}!
        </span>
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
        toggleCartVisibility={toggleCartVisibility}
        selectedCategory={selectedCategory}
        selectedSize={selectedSize}
        products={filteredProducts}
      />
      
      {/* Disclaimer Footer */}
      <footer className="flex flex-col items-center gap-1 text-center py-4 px-4 bg-slate-100 text-xs text-gray-600">
        <p>&copy; {new Date().getFullYear()} Mohamed Jalloh. All rights reserved.</p>
        <p>
          <strong>Disclaimer:</strong> All products, names, images, and branding are the property of{' '}
          <a href="https://www.cedarsfoods.com" className="text-emerald-600 underline" target="_blank" rel="noopener noreferrer">
            CedarsFoods.com
          </a>. This project was created for educational and experimental purposes only.
        </p>
      </footer>
    </section>
  );
}
