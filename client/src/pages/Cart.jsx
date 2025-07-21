import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { dummyAddress } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    cartCount,
    totalCartAmount,
    cartItems,
    removeFromCart,
    updateCartItem,
    axios,
    user,
    setCartItems
  } = useContext(AppContext);

  const navigate = useNavigate();

  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    const tempArray = [];
    for (const key in cartItems) {
      const product = products.find((p) => p._id === key);
      if (product) {
        tempArray.push({ ...product, quantity: cartItems[key] });
      }
    }
    setCartArray(tempArray);
  };

  const getAddress=async()=>{
    try {
      const {data}= await axios.get('/api/address/get');
      if(data.success){
        setAddress(data.addresses);
        if(data.addresses.length>0){
          setSelectedAddress(data.addresses[0]);
        }
      }
      else{
        toast.error(data.message);
      }
      
    } catch (error) {
        toast.error(error.message);
    }
  };
  useEffect(()=>{
    if(user){
      getAddress();
    }


  },[user]);

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

 const placeOrder = async () => {
  try {
    if (!selectedAddress) {
      return toast.error("Please select an address");
    }

    // Place order with Cash on Delivery
    if (paymentOption === "COD") {
      const { data } = await axios.post("/api/order/cod", {
        items: cartArray.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        address: selectedAddress._id,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/my-orders");
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  const total = totalCartAmount();
  const tax = parseFloat((total * 0.02).toFixed(2));
  const finalTotal = parseFloat((total + tax).toFixed(2));

  // ✅ Fix Applied Here
  if (!cartItems || !products.length || Object.keys(cartItems).length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500 px-4">
        <img
          src="/empty-cart.png"
          alt="Empty cart"
          className="w-32 h-32 opacity-60 mb-5"
        />
        <p className="text-lg text-center">Your cart is empty</p>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      {/* Left - Cart Items */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-indigo-500">{cartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(
                    `/product/${product.category.toLowerCase()}/${product._id}`
                  );
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
              >
                <img
                  src={`http://localhost:5000/images/${product.image[0]}`}
                  alt={product.name}
                  className="max-w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Size: <span>{product.weight || "N/A"}</span>
                  </p>
                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                      value={cartItems[product._id]}
                      className="outline-none ml-2"
                    >
                      {Array.from(
                        { length: Math.max(9, cartItems[product._id]) },
                        (_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center">
              ${(product.offerPrice * product.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removeFromCart(product._id)}
              className="cursor-pointer mx-auto"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path
                  d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                  stroke="#FF532E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
        >
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
            <path
              d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
              stroke="#615fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Continue Shopping
        </button>
      </div>

      {/* Right - Summary */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        {/* Address Info */}
        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No Address Found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-indigo-500 hover:underline cursor-pointer"
            >
              Change
            </button>

            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                {address.map((addr, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(addr);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {`${addr.street}, ${addr.city}, ${addr.state}, ${addr.country}`}
                  </p>
                ))}
                {/* Add Address */}
                <button
                  onClick={() => {
                    navigate("/add-address");
                    setShowAddress(false);
                  }}
                  className="text-indigo-500 text-center w-full p-2 hover:bg-indigo-500/10"
                >
                  Add Address
                </button>
              </div>
            )}
          </div>

          {/* Payment Option */}
          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            value={paymentOption}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        {/* Price Summary */}
        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Items Total</span>
            <span>${total.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>${tax.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>${finalTotal.toFixed(2)}</span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
