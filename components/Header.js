
'use client';
import { ShoppingCartCheckoutRounded } from '@mui/icons-material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import '../styles/globals.css';
import Nav from './Nav';

function Header({
  toggleCartVisibility,
  selectedCategory,
  setSelectedCategory,
  selectedSize,
  setSelectedSize
}) {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const storeName = sessionStorage.getItem('storeName');

      if (!storeName) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(`/api/products?storeId=${storeName}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          alert('Failed to load products. Please log in again.');
          router.push('/login');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        alert('An error occurred. Please try again.');
      }
    };

    

    fetchProducts();
  }, [router]);

  return (
    <header className="border-b-2 border-black pb-2 px-10 flex max-md:flex-col max-md:justify-center justify-between items-center">
      <div>
        <h2 className="text-4xl font-bold text-emerald-900">Available Products</h2>
        <div className="filters flex max-md:justify-center gap-4 mt-2 text-emerald-600">
          <select
            className="productList"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSize('');
            }}
            value={selectedCategory}
          >
            <option value="">All Categories</option>
            {[...new Set(products.map((product) => product.name))].map((category) => (
  <option key={category} value={category}>
    {category}
  </option>
))}

          </select>

          <select
  className="productList"
  onChange={(e) => setSelectedSize(e.target.value)}
  value={selectedSize}
  disabled={!selectedCategory}
>
  <option value="">All Sizes</option>
  {[...new Set(
    products
      .filter((product) => product.name === selectedCategory)
      .flatMap((product) => product.items.map((item) => item.size))
  )].map((size) => (
    <option key={size} value={size}>
      {size}
    </option>
  ))}
</select>


          
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Nav />
        <ShoppingCartCheckoutRounded
          className="cartBtn bg-emerald-900 h-2 w-2 p-[2px] hover:scale-[1.1] transition-all hover:cursor-pointer hover:bg-emerald-800 text-emerald-50 rounded-full"
          onClick={toggleCartVisibility}
        />
      </div>
    </header>
  );
}

export default Header;
