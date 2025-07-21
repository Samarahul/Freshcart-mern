import React, { useEffect, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { AppContext } from '../context/AppContext';

const MyOrders = () => {
  const { axios, user } = useContext(AppContext); // ✅ Moved inside component
  const [myOrders, setMyOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="mt-12 pb-16 px-4">
      <div>
        <p className="text-2xl font-medium md:text-3xl">My Orders</p>
      </div>

      {myOrders.map((order, index) => (
        <div
          key={index}
          className="my-8 border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl bg-white shadow-sm"
        >
          {/* Order summary */}
          <div className="flex justify-between items-center gap-6 font-medium mb-4 text-gray-800">
            <span>Order ID: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>Total Amount: ${order.amount}</span>
          </div>

          {/* Items inside the order */}
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className={`relative text-gray-800 ${
                order.items.length !== idx + 1 ? "border-b" : ""
              } border-gray-200 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 w-full`}
            >
              {/* Product Info */}
              <div className="flex items-center mb-4 md:mb-0">
                <div className="p-4 rounded-lg">
                  <img
                    src={`http://localhost:5000/images/${item.product.image[0]}`}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium">{item.product.name}</h2>
                  <p className="text-sm text-gray-500 capitalize">{item.product.category}</p>
                </div>
              </div>

              {/* Quantity and Status */}
              <div className="text-sm md:text-base text-gray-700 mb-4 md:mb-0">
                <p>Quantity: {item.quantity || 1}</p>
                <p>Status: {order.status}</p>
                <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              </div>

              {/* Price */}
              <p className="font-medium text-indigo-600 text-sm md:text-base">
                Amount: ${item.product.offerPrice * item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
