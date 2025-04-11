import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const ProductsPage = () => {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);

  

  useEffect(() => {
    const fetchProducts = async () => {
      if (session) {
        const res = await fetch(`/api/products?storeId=${session.user.storeId}`);
        const data = await res.json();
        setProducts(data);
      }
    };

    fetchProducts();
  }, [session]);


  if (!session) {
    return <p>Please sign in to view products.</p>;
  }


  return (
    <div>
      <h1>Products for {session?.user.username}</h1>
      {products.length > 0 ? (
        <div>
          {products.map((product) => (
            <div key={product._id}>
              <h2>{product.name}</h2>
              {product.items.map((item) => (
                <div key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.size}</p>
                  <p>{item.amountPerBox} per box</p>
                  <img src={item.itemImage} alt={item.name} />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

export default ProductsPage;
