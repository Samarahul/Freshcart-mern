import { createContext, useEffect, useState } from "react";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from 'axios';
axios.defaults.withCredentials=true;
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");


//check seller status

const fetchSeller=async()=>{
  try {
    const {data}=await axios.get("/api/seller/is-auth");
    if(data.success){
      setIsSeller(true);
    }
    else{
      setIsSeller(false);
    }
  } catch (error) {
    toast.error(error.message);
    
  }
};

//fetch user status

const fetchUser=async()=>{
  try {
    const {data}=await axios.get('/api/user/is-auth');
    if(data.success){
      setUser(true);
      setCartItems(data.user.cart);
    }
    else{
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
    
  }
};


  // Fetch all products data
  const fetchProducts = async () => {
   try {
    const {data}=await axios.get("/api/product/list");
    if(data.success){
       setProducts(data.products);
    }
    else{
      toast.error(data.message);
    }
   } catch (error) {
      toast.error(error.message);
   }
  };

  // Add product to cart
  const addToCart = (itemId) => {
    let cartData = { ...cartItems };
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("added to cart");
  };

  // Update cart quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = { ...cartItems };
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("cart updated");
  };

  // Total cart items
  const cartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  // Total cart amount
  const totalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      let itemInfo = products.find((product) => product._id === item);
      if (itemInfo && cartItems[item] > 0) {
        totalAmount += cartItems[item] * itemInfo.offerPrice;
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  // Remove product from cart
  const removeFromCart = (itemId) => {
    let cartData = { ...cartItems };
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
      toast.success("removed from cart");
      setCartItems(cartData);
    }
  };
  useEffect(()=>{
    const updateCart=async()=>{
     try {
       const {data}=await axios.post("/api/cart/update",{cartItems});
      if(!data.success){
        toast.error(data.message);
      }
    }
       catch (error) {
        toast.error(error.message); 
     }
  };
  if(user){
    updateCart();
  }
},[cartItems]);

  useEffect(() => {
    fetchProducts();
    fetchSeller();
    fetchUser();
  }, []);

  const value = {
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    addToCart,
    cartItems,
    setCartItems,
    updateCartItem,
    cartCount,
    totalCartAmount,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    axios,
    fetchProducts,
    setCartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;


/*
Explanation:

- A React context (`AppContext`) is created to share state globally across the application.
- `AppContextProvider` manages and provides the following states:
  1. `user`: Stores logged-in user info.
  2. `isSeller`: Boolean flag to determine if the current user is a seller.
  3. `showUserLogin`: Controls visibility of the login/register modal.
  4. `products`: Stores a list of products (fetched here from dummy data).
- `fetchProducts()` loads mock product data from `dummyProducts`.
- `useEffect` ensures product data is loaded once when the provider mounts.
- The `value` object is passed to all children via `AppContext.Provider`.

Summary:

This component sets up global app-wide state using React Context API.
It manages user auth status, modal visibility, seller role, and product list.
All child components wrapped in this provider can access and modify these shared values.
*/
