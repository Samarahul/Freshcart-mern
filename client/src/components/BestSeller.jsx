import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ProductCard from './ProductCard';

const BestSeller = () => {
  const { products } = useContext(AppContext);

  return (
    <div className="mt-16">
      <p className="text-2xl font-medium md:text-3xl">Best Sellers</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default BestSeller;

/*
Explanation:

- This component displays a "Best Sellers" section on the homepage.
- It uses `useContext` to access the global `products` array from `AppContext`.
- Filters the products to include only those that are currently in stock.
- Uses `.slice(0, 5)` to limit the display to the first 5 in-stock products.
- Each product is rendered using the <ProductCard /> component in a responsive grid layout.
- Tailwind CSS classes manage spacing and layout across different screen sizes.

Summary:

This component renders the top 5 in-stock products under the "Best Sellers" heading.
It fetches product data from global context and displays them as cards in a responsive grid.
*/
