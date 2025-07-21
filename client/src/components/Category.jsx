import React from 'react';
import { categories } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-16">
      <p className="text-2xl font-medium md:text-3xl">Categories</p>
      <div className="my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 items-center justify-center">
        {categories.map((category, index) => (
          <div
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            key={index}
            className="group cursor-pointer py-5 px-3 rounded-lg gap-2 flex flex-col items-center justify-center hover:shadow-md transition-all duration-300"
            style={{ backgroundColor: category.bgColor }}
          >
            <img src={category.image} alt={category.text} className="max-w-28 transition group-hover:scale-110" />
            <p className="text-sm font-medium">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;

/*
Explanation:
in di if we write styling for eg gap-2 it gives vertical gap spacing bewteen the components present in the div
- This component renders a grid of product categories using data from the `categories` array.
- `useNavigate` from `react-router-dom` allows programmatic navigation on click.
- Each category card is clickable and navigates to a filtered product page: `/products/{category}`.
- The window scrolls smoothly to the top when a category is selected.
- Cards include an image and label, styled responsively using Tailwind CSS.
- Background color of each card is set dynamically from the category object.

Summary:

The Category component displays all available product categories in a responsive grid.
Clicking on a category navigates to a filtered product listing page and scrolls to the top.
This allows users to explore products by category visually and intuitively.
*/
