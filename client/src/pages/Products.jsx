import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const { products, searchQuery } = useContext(AppContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-16 px-6">
      <h1 className="text-3xl lg:text-4xl font-medium mb-6">All Products</h1>
      <div className="grid grid-cols-6 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {
          filteredProducts
            .filter((product) => product.inStock)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
        }
      </div>
    </div>
  );
};

export default Products;
