import React from 'react';
import Image from 'next/image';
import '../styles/globals.css';

function ProductCard({ product, handleAddToCart }) {
  return (
    <section className="w-screen product-card py-4 px-5 flex flex-col gap-8">
      <article className="min-w-[90vw] px-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {product.items.map((item) => (
          <article
            key={`${item.id}-${item.size}`}
            className="item-card flex flex-col justify-center items-center text-center gap-8 bg-slate-50 border p-4 rounded-lg"
          >
            <Image
              src={item.itemImage || '/placeholder.png'}
              alt={item.name}
              width={0}
              height={0}
              sizes="100%"
              style={{ width: '100%', height: 'auto' }}
              className="bg-slate-100"
            />
            <article>
              <h3 className="text-emerald-800 text-xl">{item.name}</h3>
              <h5 className="text-emerald-800">
                <span className="text-sm text-emerald-500">Size: {item.size}</span>
              </h5>
            </article>
            <article>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-5 rounded"
              >
                Add to Cart
              </button>
            </article>
          </article>
        ))}
      </article>
    </section>
  );
}

export default ProductCard;
