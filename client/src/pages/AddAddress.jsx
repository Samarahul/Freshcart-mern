// AddAddress.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const AddAddress = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
const {axios,uset}=useContext(AppContext);
  const submitHandler = async (e) => {
   try {
     e.preventDefault();
     const {data}=await axios.post("/api/address/add",{address});
     if(data.success){
      toast.success(data.message);
        navigate("/cart");
     }
     else{
      toast.error(data.message);
     }

   } catch (error) {
      toast.error(error.message);
   }
  };

  useEffect(() => {
    if (user === null) return;
    if (!user) navigate("/cart");
  }, [user, navigate]);

  return (
    <div className="mt-12 flex flex-col md:flex-row gap-6 p-6 bg-gray-100 rounded-lg shadow-md">
      {/* Left Side: Address Form */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Address Details
        </h2>

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* First/Last Name */}
          <input name="firstName" placeholder="First Name" value={address.firstName} onChange={handleChange} required className="p-2 border rounded-md" />
          <input name="lastName" placeholder="Last Name" value={address.lastName} onChange={handleChange} required className="p-2 border rounded-md" />

          {/* Email */}
          <input name="email" type="email" placeholder="Email" value={address.email} onChange={handleChange} required className="col-span-2 p-2 border rounded-md" />

          {/* Street */}
          <input name="street" placeholder="Street Address" value={address.street} onChange={handleChange} required className="col-span-2 p-2 border rounded-md" />

          {/* City, State */}
          <input name="city" placeholder="City" value={address.city} onChange={handleChange} required className="p-2 border rounded-md" />
          <input name="state" placeholder="State" value={address.state} onChange={handleChange} required className="p-2 border rounded-md" />

          {/* Zip, Country */}
          <input name="zipCode" placeholder="Zip Code" value={address.zipCode} onChange={handleChange} required className="p-2 border rounded-md" />
          <input name="country" placeholder="Country" value={address.country} onChange={handleChange} required className="p-2 border rounded-md" />

          {/* Phone */}
          <input name="phone" placeholder="Phone" value={address.phone} onChange={handleChange} required className="col-span-2 p-2 border rounded-md" />

          {/* Submit Button */}
          <button
            type="submit"
            className="col-span-2 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md"
          >
            Save Address
          </button>
        </form>
      </div>

      {/* Right Side: Image */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={assets.add_address_iamge}
          alt="Add Address"
          className="w-full max-w-xs rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default AddAddress;
