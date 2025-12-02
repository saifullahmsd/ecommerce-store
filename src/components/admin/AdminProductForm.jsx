import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../api/dummyProductsApi";
import { toast } from "react-hot-toast";
import { FloppyDisk, ArrowLeft, CircleNotch } from "phosphor-react";
import Skeleton from "../../components/shared/Skeleton";

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  // Fetch data if in Edit Mode
  const { data: product, isLoading } = useGetProductByIdQuery(id, {
    skip: !isEditMode,
  });

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
    images: ["", "", ""],
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        discountPercentage: product.discountPercentage,
        stock: product.stock,
        brand: product.brand,
        category: product.category,
        thumbnail: product.thumbnail,
        images: product.images || ["", "", ""],
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    // SIMULATE API CALL
    setTimeout(() => {
      setIsSaving(false);

      if (isEditMode) {
        toast.success("Product updated successfully (Mock)!");
      } else {
        toast.success("Product created successfully (Mock)!");
      }

      navigate("/admin/products");
    }, 1500);
  };

  if (isEditMode && isLoading) {
    return (
      <div className="p-8">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/products")}
            className="rounded-full bg-white p-2 text-gray-500 shadow-sm hover:text-primary"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-8 lg:grid-cols-3"
      >
        {/* LEFT COLUMN: Main Info */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-gray-800">
              Basic Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">
                  Product Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-primary focus:outline-none"
                  placeholder="e.g. iPhone 15 Pro"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-primary focus:outline-none"
                  placeholder="Product description..."
                  required
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-gray-800">Images</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">
                  Main Thumbnail URL
                </label>
                <input
                  type="url"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-primary focus:outline-none"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              {/* Preview Main Image */}
              {formData.thumbnail && (
                <div className="h-40 w-full overflow-hidden rounded-lg border border-gray-100 bg-gray-50 p-2">
                  <img
                    src={formData.thumbnail}
                    alt="Preview"
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Settings & Price */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-gray-800">
              Pricing & Stock
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-primary focus:outline-none"
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">
                  Discount (%)
                </label>
                <input
                  type="number"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-primary focus:outline-none"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-primary focus:outline-none"
                  placeholder="0"
                  required
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-gray-800">
              Organization
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-primary focus:outline-none"
                  placeholder="e.g. smartphones"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-primary focus:outline-none"
                  placeholder="e.g. Apple"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isSaving ? (
              <>
                <CircleNotch className="animate-spin" size={20} /> Saving...
              </>
            ) : (
              <>
                <FloppyDisk size={20} weight="bold" /> Save Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
