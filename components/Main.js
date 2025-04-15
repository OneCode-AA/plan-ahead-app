'use client';
import React, { useState, useEffect } from 'react';
import Cart from './Cart';
import ProductCard from './ProductCard';

function Main({ storeId, isCartVisible, selectedCategory, selectedSize }) {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

 
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);


  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`/api/products?storeId=${storeId}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    }
    if (storeId) {
      fetchProducts();
    }
  }, [storeId]);


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
    <div className="products-page grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
     
      <section className="col-span-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="mb-10">
              <h2 className="text-2xl font-bold text-emerald-800 mb-2">
                {product.name}
              </h2>

              {selectedSize ? (
                <p className="text-emerald-600 text-sm mb-4">
                  Size: {selectedSize}
                </p>
              ) : (
                <p className="text-emerald-600 text-sm mb-4">
                  Sizes: {[...new Set(product.items.map((item) => item.size))].join(', ')}
                </p>
              )}

              <ProductCard
                product={product}
                handleAddToCart={handleAddToCart}
              />
            </div>
          ))
        ) : (
          <p>No products match your filters.</p>
        )}
      </section>

    
      <section className="col-span-1">
        {isCartVisible && (
          <Cart
            cartItems={cartItems}
            onRemoveItem={handleRemoveItem}
          />
        )}
      </section>
    </div>
  );
}

export default Main;