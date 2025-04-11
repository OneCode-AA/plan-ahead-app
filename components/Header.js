// 'use client'
import { ShoppingCartCheckout } from '@mui/icons-material';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import '../styles/globals.css';
import Nav from './Nav';

function Header() {
     const [selectedCategory, setSelectedCategory] = useState('');
      const [selectedSize, setSelectedSize] = useState('');
      const [isCartVisible, setIsCartVisible] = useState(false);
      const [products, setProducts] = useState([]);
      const router = useRouter();


      const toggleCartVisibility = () => {
        setIsCartVisible(!isCartVisible);
      };
    
      
      useEffect(() => {
        const fetchProducts = async () => {
          const token = localStorage.getItem('token');
          const storeName = localStorage.getItem('storeName');
    
          if (!token || !storeName) {
            router.push('/login'); 
            return;
          }
    
          try {
            const response = await fetch(`/api/products/getProducts?storeName=${storeName}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
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
      }, [Router]);
    
    
      useEffect(() => {
        const savedCategory = localStorage.getItem('selectedCategory') || '';
        const savedSize = localStorage.getItem('selectedSize') || '';
        setSelectedCategory(savedCategory);
        setSelectedSize(savedSize);
      }, []);
    
      useEffect(() => {
        localStorage.setItem('selectedCategory', selectedCategory);
        localStorage.setItem('selectedSize', selectedSize);
      }, [selectedCategory, selectedSize]);
    
  


  return (
    <header className="border-b-2 border-black pb-2 flex justify-between items-center">
    <div>
      <h2 className="text-4xl font-bold text-emerald-900">Available Products</h2>
      <div className="filters flex gap-4 mt-2 text-emerald-600">
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
          {[
            ...new Set(
              products
                .filter((product) => product.name === selectedCategory)
                .flatMap((product) => product.sizes)
            ),
          ].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
    <div>
      <Nav/>
      <ShoppingCartCheckout
        className="cartBtn text-5xl bg-emerald-900 p-2 hover:scale-[1.1] transition-all hover:cursor-pointer hover:bg-emerald-800 text-emerald-50 rounded-full"
        onClick={toggleCartVisibility}
      />
    </div>
  </header>
  )
}

export default Header