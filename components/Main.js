'use client';
import React, { useState, useEffect } from 'react';
import Cart from './Cart';
import ProductCard from './ProductCard';
import '../styles/globals.css';

function Main({
  storeId,
  isCartVisible,
  toggleCartVisibility,
  selectedCategory,
  selectedSize,
  products
}) {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

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

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  // Filter products based on category, size, and store
  const filteredProducts = products
    .filter((product) => {
      const categoryMatch = !selectedCategory || product.name === selectedCategory;

      const matchingItems = product.items.filter(
        (item) =>
          (!selectedSize || item.size === selectedSize) &&
          item.storeId.includes(storeId)
      );

      return categoryMatch && matchingItems.length > 0;
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
    <section className="w-screen products-page grid grid-cols-1 max-md:text-center md:grid-cols-4 gap-6 p-4">
      <article className="">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <section key={product.id} className="mb-10 w-screen">
              <h2 className="text-2xl ml-10 font-bold text-emerald-800 mb-2">
                {product.name}
              </h2>

              {selectedSize ? (
                <p className="text-emerald-600 ml-10 text-sm mb-4">
                  Size: {selectedSize}
                </p>
              ) : (
                <p className="text-emerald-600 ml-10 text-sm mb-4">
                  Sizes: {[...new Set(product.items.map((item) => item.size))].join(', ')}
                </p>
              )}

              <ProductCard
                product={product}
                handleAddToCart={handleAddToCart}
              />
            </section>
          ))
        ) : (
          <p>No products match your filters.</p>
        )}
      </article>

      <article className="col-span-1">
        {isCartVisible && (
          <Cart
            cartItems={cartItems}
            onRemoveItem={handleRemoveItem}
            toggleCartVisibility={toggleCartVisibility}
          />
        )}
      </article>
    </section>
  );
}

export default Main;
