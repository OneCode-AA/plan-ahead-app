import React from 'react';
import Image from 'next/image';
import '../styles/globals.css'

function ProductCard({ product, handleAddToCart }) {
  return (
    <section className="product-card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {product.items.map((item) => (
        <article
          key={item.id}
          className="item-card flex flex-col justify-center items-center text-center gap-3 bg-slate-50 border p-4 rounded-lg"
        >
          <Image
            src={item.itemImage || '/placeholder.png'}
            alt={item.name}
            width={100}
            height={100}
            className="rounded"
          />
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p className="text-sm">Size: {item.size}</p>
          <button
            onClick={() => handleAddToCart(item)}
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-5 rounded"
          >
            Add to Cart
          </button>
        </article>
      ))}
    </section>
  );
}

export default ProductCard;
