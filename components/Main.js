'use client';
import React, { useState, useEffect } from 'react';
import Cart from './Cart';
import ProductCard from './ProductCard';

function Main({ storeId }) {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage when cartItems change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch products and filter by storeId
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        // ✅ Filter products by storeId
        const filteredProducts = data.filter((product) =>
          product.storeId.includes(storeId)
        );
        setProducts(filteredProducts);
      }
    }
    if (storeId) {
      fetchProducts();
    }
  }, [storeId]);

  // Add item to cart
  const handleAddToCart = (item) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Remove item from cart
  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  return (
    <main className="flex flex-col py-6">
      <section className="products-page relative px-4">
        {isCartVisible && <Cart cartItems={cartItems} onRemoveItem={handleRemoveItem} />}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <p>No products available for your store.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Main;
