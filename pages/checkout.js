import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import '../styles/globals.css'

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

 
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCart);
  }, []);
  

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleContinueShopping = () => {
    router.push('/dashboard'); 
  };

  return (
    <section className="shopping-cart-page bg-white text-black min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      {cartItems.length === 0? (
        <p>Your cart is empty. <button onClick={handleContinueShopping} className="text-emerald-500 underline">Continue shopping</button>.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="cart-item flex justify-between items-center p-2 mb-2 bg-slate-100 rounded-lg border"
            >
              <Image
                src={item.itemImage || '/placeholder.png'}
                alt={item.name}
                width={50}
                height={50}
                className="rounded"
              />
              <div className="item-details flex-1 ml-4">
                <h4 className="font-bold">{item.name}</h4>
                <p className="text-sm">Size: {item.size}</p>
                <p className="text-sm">Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemoveItem(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <span className="font-bold">Total Items:</span>
            <span>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
          </div>
          <button
            onClick={handleContinueShopping}
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-5 rounded mt-4"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </section>
  );
}

export default Checkout;