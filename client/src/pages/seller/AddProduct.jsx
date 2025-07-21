import { useContext, useState } from "react";
import { assets, categories } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { axios } = useContext(AppContext);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);
      formData.append("category", category);

      for (let i = 0; i < files.length; i++) {
        formData.append("image", files[i]);
      }

      const { data } = await axios.post("/api/product/add-product", formData);
      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setPrice("");
        setOfferPrice("");
        setCategory("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md max-w-md mx-auto flex flex-col gap-5"
    >
      {/* Product Images */}
      <div>
        <label className="block font-medium mb-2">Product Image</label>
        <div className="flex gap-3">
          {Array(4)
            .fill()
            .map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  type="file"
                  id={`image${index}`}
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                />
                <img
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : assets.upload_area
                  }
                  className="w-20 h-20 object-cover cursor-pointer border border-gray-300 rounded"
                  alt="upload-area"
                />
              </label>
            ))}
        </div>
      </div>

      {/* Product Name */}
      <div>
        <label className="block font-medium mb-2" htmlFor="product-name">
          Product Name
        </label>
        <input
          id="product-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 focus:outline-indigo-500"
        />
      </div>

      {/* Product Description */}
      <div>
        <label className="block font-medium mb-2" htmlFor="product-description">
          Product Description
        </label>
        <textarea
          id="product-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className="w-full border rounded px-3 py-2 focus:outline-indigo-500 resize-none"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-medium mb-2" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 focus:outline-indigo-500"
        >
          <option value="">Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat.path}>
              {cat.path}
            </option>
          ))}
        </select>
      </div>

      {/* Product Price and Offer Price side by side */}
      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <label className="block font-medium mb-2" htmlFor="product-price">
            Product Price
          </label>
          <input
            id="product-price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-indigo-500"
          />
        </div>
        <div className="flex-1">
          <label className="block font-medium mb-2" htmlFor="offer-price">
            Offer Price
          </label>
          <input
            id="offer-price"
            type="number"
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-indigo-500"
          />
        </div>
      </div>

      {/* Add Product Button */}
      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded mt-2 transition"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
