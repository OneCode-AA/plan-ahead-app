import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../styles/globals.css';

function Cart({ cartItems = [], onRemoveItem, toggleCartVisibility }) {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQuantity(total);
  }, [cartItems]);

  const handleCheckout = () => {
    toggleCartVisibility; // Close cart when going to checkout
    router.push('/checkout');
  };

  

  return (
    <section className="shopping-cart bg-slate-100 p-4 rounded-lg border fixed right-5 top-[100px] z-50 w-[350px] shadow-xl max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <button
          onClick={toggleCartVisibility}
          className="text-xl font-bold text-gray-500 hover:text-gray-800"
          aria-label="Close cart"
        >
          ✕
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="cart-item flex justify-between items-center p-2 mb-2 bg-white rounded-lg border"
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
                <p className="text-sm">Qty: {item.quantity}</p>
              </div>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between mt-4 text-md font-semibold">
            <span>Total Items:</span>
            <span>{totalQuantity}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-5 rounded mt-4 w-full"
          >
            Checkout
          </button>
        </div>
      )}
    </section>
  );
}

export default Cart;
