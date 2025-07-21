// src/App.js
import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MyOrders from './pages/MyOrders';
import Auth from './models/Auth';
import ProductCategory from './pages/ProductCategory';
import { AppContext } from './context/AppContext';
import AddAddress from './pages/AddAddress';
import { Toaster } from 'react-hot-toast';
import SellerLayout from './pages/seller/SellerLayout';
import SellerLogin from './components/seller/SellerLogin';
import Orders from './pages/seller/Orders';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import ProtectedRoute from './components/ProtectedRoute'; // ✅ Import this

export const App = () => {
  const { isSeller, showUserLogin } = useContext(AppContext);
  const isSellerPath = useLocation().pathname.includes("seller");

  return (
    <div className='text-default min-h-screen'>
      {!isSellerPath && <Navbar />}
      {showUserLogin && <Auth />}
      <Toaster />
      <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
        <Routes>
          {/* ✅ Public routes (no login needed) */}
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/product/:category/:id' element={<ProductDetails />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          
          {/* ✅ Protected User Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/cart' element={<Cart />} />
            <Route path='/my-orders' element={<MyOrders />} />
            <Route path='/add-address' element={<AddAddress />} />
          </Route>

          {/* ✅ Seller routes (already partially protected) */}
          <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path="product-list" element={isSeller ? <ProductList /> : null} />
            <Route path="orders" element={isSeller ? <Orders /> : null} />
          </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
