// pages/api/products.js
import productList from '../../data/products';

export default function handler(req, res) {
  try {
    const { storeId } = req.query;

    // Filter the products by matching storeId in any of their items
    const filteredProducts = productList.map(product => {
      const filteredItems = product.items.filter(item => item.storeId.includes(storeId));
      if (filteredItems.length > 0) {
        return { ...product, items: filteredItems };
      }
      return null;
    }).filter(Boolean);

    res.status(200).json(filteredProducts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
