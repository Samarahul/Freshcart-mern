import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const {addToCart,cartItems,removeFromCart}=useContext(AppContext);
  const [count, setCount] = useState(0);

  const goToProductPage = () => {
    navigate(`/product/${product.category.toLowerCase()}/${product._id}`);
  };

  return (
    product && (
      <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
        <div onClick={goToProductPage} className="cursor-pointer">
          <div className="group flex items-center justify-center px-2">
            <img
              className="group-hover:scale-105 transition max-w-26 md:max-w-36"
              src={`http://localhost:5000/images/${product.image[0]}`}
              alt={product.name}
            />
          </div>
          <div className="text-gray-500/60 text-sm mt-2">
            <p>{product.category}</p>
            <p className="text-gray-700 font-medium text-lg truncate w-full">
              {product.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-0.5 mt-1">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="rating"
                className="w-3 md:w-3.5"
              />
            ))}
          <p>(4)</p>
        </div>

        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-indigo-500">
            ${product.offerPrice}{" "}
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
              ${product.price}
            </span>
          </p>

          <div className="text-indigo-500" onClick={(e) => e.stopPropagation()}>
            {!cartItems?.[product._id] ? (
              <button
                className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium"
                onClick={() =>  addToCart(product._id)}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                    stroke="#615fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-500/25 rounded select-none">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  -
                </button>
                <span className="w-5 text-center">{cartItems[product._id]}</span>
                <button
                  onClick={() =>  addToCart(product._id)}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;

/*
Explanation:

- This component displays a product card used throughout the app (e.g., in Best Sellers, Category).
- `navigate()` is used to go to the product detail page when the image or title is clicked.
- Displays:
  - Product image
  - Product category and name
  - 5-star rating UI (4 stars filled, 1 dull)
  - Offer price and original price (with line-through)
- Includes an "Add" button to increment product count.
- When clicked once, it shows a counter with `+` and `-` buttons to change quantity.
- `stopPropagation()` is used to prevent clicks on the counter from triggering the parent navigation.

Summary:

The `ProductCard` component visually represents each product with image, pricing, category, and rating.
It allows users to quickly add a product to cart or increase quantity directly from the card.
Clicking outside the buttons navigates to the product's detail page.
*/
