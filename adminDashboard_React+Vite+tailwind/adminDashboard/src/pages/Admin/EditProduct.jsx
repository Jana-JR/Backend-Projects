import React, { Fragment, useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../Utils/axios";
import { Box, InputLabel } from "@mui/material";
import { toast } from "react-toastify";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setProductTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [stockQuantity, setStockQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");



  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(`/products/${id}`);
        setProductTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
        setStockQuantity(data.stockQuantity);
        setBrand(data.brand?.name || ""); // Adjusting for brand reference
        setImage(data.image || ""); // Assuming single image
      } catch (err) {
        console.error("Failed to load product", err);
      }
    }

    fetchProduct();
  }, [id]);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.url;
    } catch (err) {
      console.error("Image upload failed", err);
      return null;
    }
  };

  const handleSingleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await handleImageUpload(file);
    if (url) {
      setImage(url);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      isNaN(price) ||
      price <= 0 ||
      isNaN(stockQuantity) ||
      stockQuantity <= 0 ||
      title.trim() === ""
    ) {
      return toast.error("Please enter valid details");
    }

    const payload = {
      title: title,
      description,
      price: parseFloat(price),
      discountPercentage: parseFloat(discountPercentage),
      stockQuantity: parseInt(stockQuantity),
      brand,
      image,
    };

    console.log("Payload to be sent:", payload);

    try {
      await axios.patch(`/products/${id}`, payload);

      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error("Update failed")
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/5">
        <Sidebar />
      </div>
      <div className="w-full md:w-4/5 px-4">
        <Fragment>
          <div className="flex justify-center mt-10">
            <form
              onSubmit={handleSubmit}
              className="shadow-lg p-6 rounded-lg bg-white w-full max-w-lg"
              encType="multipart/form-data"
            >
              <h1 className="text-2xl font-semibold mb-4 text-center">
                Update Product
              </h1>

              <Input label="Title" value={title} onChange={setProductTitle} />
              <Input label="Brand" value={brand} onChange={setBrand} />
              <Input
                label="Price"
                type="number"
                value={price}
                onChange={setPrice}
              />
              <Input
                label="Discount (%)"
                type="number"
                value={discountPercentage}
                onChange={setDiscountPercentage}
              />
              <Textarea
                label="Description"
                value={description}
                onChange={setDescription}
              />
              <Input
                label="Stock Quantity"
                type="number"
                value={stockQuantity}
                onChange={setStockQuantity}
              />

              <Box mb={3}>
                <InputLabel>Upload Image</InputLabel>
                <input type="file" onChange={handleSingleImageUpload} />
              </Box>

              <button
                id="login_button"
                type="submit"
                className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-400 transition duration-200 mt-4"
              >
                UPDATE
              </button>

              <input
                className="w-full bg-red-500 text-white mt-2 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
                type="reset"
                value="Reset"
              />
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}

// Reusable input components
const Input = ({ label, type = "text", value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium">{label}</label>
    <input
      type={type}
      value={value}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      onChange={(e) =>
        onChange(
          type === "number" ? parseFloat(e.target.value) : e.target.value
        )
      }
    />
  </div>
);

const Textarea = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium">{label}</label>
    <textarea
      rows="4"
      value={value}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      onChange={(e) => onChange(e.target.value)}
    ></textarea>
  </div>
);
