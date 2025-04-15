import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import '../styles/globals.css';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleContinueShopping = () => {
    router.push('/dashboard');
  };

  const handleEmailReceipt = async () => {
    const receiptHTML = `
      <h2>New Order Receipt</h2>
      <ul>
        ${cartItems.map(item => `
          <li>
            <strong>${item.name}</strong> (${item.size}) - Quantity: ${item.quantity}
          </li>
        `).join('')}
      </ul>
      <p><strong>Total Items:</strong> ${cartItems.reduce((total, item) => total + item.quantity, 0)}</p>
    `;

    try {
      const response = await fetch('/api/email-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: 'New Order from Store Dashboard', html: receiptHTML }),
      });

      if (response.ok) {
        alert('Receipt emailed successfully!');
        localStorage.removeItem('cartItems');
        router.push('/dashboard');
      } else {
        alert('Failed to send email.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while sending the receipt.');
    }
  };

  return (
    <section className="shopping-cart-page bg-white text-black min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty.{' '}
          <button onClick={handleContinueShopping} className="text-emerald-500 underline">
            Continue shopping
          </button>.
        </p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
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
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleContinueShopping}
              className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-5 rounded"
            >
              Continue Shopping
            </button>
            <button
              onClick={handleEmailReceipt}
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-5 rounded"
            >
              Email Receipt
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Checkout;
