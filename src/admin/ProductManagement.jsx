
import React, { useEffect, useState } from "react";

const SERVER_URL = "https://imtiaz-trader-api.vercel.app";
const API = `${SERVER_URL}/api/products`;
const CATEGORY_API = `${SERVER_URL}/api/categories`;

const fallbackImage =
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400";

const emptyForm = {
  name: "",
  brand: "",
  category: "Laptops",
  processor: "",
  generation: "",
  ram: "",
  operatingSystem: "",
  storage: "",
  graphics: "",
  price: "",
  stock: 0,
  condition: "",
  availability: "Contact to confirm",
  description: "",
  featured: false,
  available: true,
};

function getImageUrl(image) {
  if (!image) return fallbackImage;

  return image.startsWith("http")
    ? image
    : `${SERVER_URL}${image.startsWith("/") ? "" : "/"}${image}`;
}

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    processor: "",
    generation: "",
    ram: "",
    storage: "",
    condition: "",
    minPrice: "",
    maxPrice: "",
    status: "",
  });

  const [sortBy, setSortBy] = useState("newest");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const token = localStorage.getItem("adminToken");

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setSearch("");
    setFilters({
      brand: "",
      category: "",
      processor: "",
      generation: "",
      ram: "",
      storage: "",
      condition: "",
      minPrice: "",
      maxPrice: "",
      status: "",
    });
    setSortBy("newest");
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load products.");
      }

      setProducts(data.products || []);
    } catch (error) {
      showMessage(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${CATEGORY_API}/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load categories.");
      }

      setCategories(data.categories || []);
    } catch (error) {
      console.error("Category loading error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    return () => {
      previewImages.forEach((image) => {
        URL.revokeObjectURL(image.url);
      });
    };
  }, [previewImages]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length + existingImages.length > 8) {
      showMessage("A product can have a maximum of 8 images.", "error");
      e.target.value = "";
      return;
    }

    const invalidFile = files.find(
      (file) =>
        !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
          file.type
        )
    );

    if (invalidFile) {
      showMessage("Please select JPG, PNG, WEBP or GIF images.", "error");
      e.target.value = "";
      return;
    }

    const oversizedFile = files.find(
      (file) => file.size > 5 * 1024 * 1024
    );

    if (oversizedFile) {
      showMessage("Each image must be smaller than 5 MB.", "error");
      e.target.value = "";
      return;
    }

    setMessage("");
    setSelectedImages(files);

    setPreviewImages(
      files.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }))
    );
  };

  const removeExistingImage = (index) => {
    setExistingImages((previous) =>
      previous.filter((_, i) => i !== index)
    );
  };

  const removeNewImage = (index) => {
    setSelectedImages((previous) =>
      previous.filter((_, i) => i !== index)
    );

    setPreviewImages((previous) =>
      previous.filter((_, i) => i !== index)
    );
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setExistingImages([]);
    setSelectedImages([]);
    setPreviewImages([]);
    setMessage("");

    const fileInput = document.getElementById("productImages");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name || "",
      brand: product.brand || "",
      category: product.category || "Laptops",
      processor: product.processor || "",
      generation: product.generation || "",
      ram: product.ram || "",
      operatingSystem: product.operatingSystem || "",
      storage: product.storage || "",
      graphics: product.graphics || "",
      price: product.price ?? "",
      stock: product.stock ?? 0,
      condition: product.condition || "",
      availability: product.availability || "Contact to confirm",
      description: product.description || "",
      featured: Boolean(product.featured),
      available: product.available !== false,
    });

    const images = product.images?.length
      ? product.images
      : product.image
        ? [product.image]
        : [];

    setExistingImages(images);
    setSelectedImages([]);
    setPreviewImages([]);

    const fileInput = document.getElementById("productImages");

    if (fileInput) {
      fileInput.value = "";
    }

    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      showMessage(
        "Your admin session has expired. Please log in again.",
        "error"
      );
      return;
    }

    if (!form.category) {
      showMessage("Please select a product category.", "error");
      return;
    }

    if (existingImages.length + selectedImages.length === 0) {
      showMessage("Please select at least one product image.", "error");
      return;
    }

    if (existingImages.length + selectedImages.length > 8) {
      showMessage("A product can have a maximum of 8 images.", "error");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const productData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key === "price" && value === "") return;
        productData.append(key, value);
      });

      selectedImages.forEach((image) => {
        productData.append("images", image);
      });

      let url = API;
      let method = "POST";

      if (editingId) {
        url = `${API}/${editingId}`;
        method = "PUT";

        productData.append(
          "existingImages",
          JSON.stringify(existingImages)
        );
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: productData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to save product.");
      }

      showMessage(
        editingId
          ? "Product updated successfully!"
          : "Product added successfully!"
      );

      resetForm();
      await fetchProducts();
    } catch (error) {
      showMessage(
        error.message || "Unable to save product.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    if (!token) {
      showMessage(
        "Your admin session has expired. Please log in again.",
        "error"
      );
      return;
    }

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to delete product.");
      }

      if (editingId === id) {
        resetForm();
      }

      showMessage("Product deleted successfully!");
      await fetchProducts();
    } catch (error) {
      showMessage(
        error.message || "Failed to delete product.",
        "error"
      );
    }
  };

  const uniqueValues = (field) =>
    [
      ...new Set(
        products.map((product) => product[field]).filter(Boolean)
      ),
    ].sort((a, b) => String(a).localeCompare(String(b)));

  const filteredProducts = products
    .filter((product) => {
      const searchText = [
        product.name,
        product.brand,
        product.category,
        product.processor,
        product.generation,
        product.ram,
        product.storage,
        product.graphics,
        product.operatingSystem,
        product.condition,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchText.includes(
        search.toLowerCase().trim()
      );

      const matchesBrand =
        !filters.brand || product.brand === filters.brand;

      const matchesCategory =
        !filters.category || product.category === filters.category;

      const matchesProcessor =
        !filters.processor || product.processor === filters.processor;

      const matchesGeneration =
        !filters.generation || product.generation === filters.generation;

      const matchesRam =
        !filters.ram || product.ram === filters.ram;

      const matchesStorage =
        !filters.storage || product.storage === filters.storage;

      const matchesCondition =
        !filters.condition || product.condition === filters.condition;

      const price = Number(product.price);

      const matchesMinPrice =
        filters.minPrice === "" ||
        (product.price != null && price >= Number(filters.minPrice));

      const matchesMaxPrice =
        filters.maxPrice === "" ||
        (product.price != null && price <= Number(filters.maxPrice));

      const matchesStatus =
        !filters.status ||
        (filters.status === "available" && product.available !== false) ||
        (filters.status === "unavailable" && product.available === false) ||
        (filters.status === "featured" && product.featured === true) ||
        (filters.status === "not-featured" && product.featured !== true);

      return (
        matchesSearch &&
        matchesBrand &&
        matchesCategory &&
        matchesProcessor &&
        matchesGeneration &&
        matchesRam &&
        matchesStorage &&
        matchesCondition &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesStatus
      );
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return (a.name || "").localeCompare(b.name || "");
      }

      if (sortBy === "price-low") {
        return Number(a.price ?? Infinity) - Number(b.price ?? Infinity);
      }

      if (sortBy === "price-high") {
        return Number(b.price ?? -Infinity) - Number(a.price ?? -Infinity);
      }

      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

  const InputField = ({
    label,
    name,
    placeholder,
    required = false,
    type = "text",
    help,
  }) => (
    <div className="pm-field">
      <label htmlFor={name}>
        {label} {required && <span className="pm-required">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        required={required}
        min={type === "number" ? "0" : undefined}
      />

      {help && <small>{help}</small>}
    </div>
  );

  return (
    <div className="pm-page">
      <style>{`
        .pm-page {
          background: #f5f6f8;
          min-height: 100vh;
          padding: 25px;
          color: #222;
        }

        .pm-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
          margin-bottom: 22px;
        }

        .pm-eyebrow {
          color: #dc2626;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.5px;
          margin-bottom: 6px;
        }

        .pm-header h1 {
          font-size: 27px;
          font-weight: 800;
          margin: 0;
          color: #171717;
        }

        .pm-header p {
          color: #777;
          font-size: 14px;
          margin: 7px 0 0;
        }

        .pm-count {
          background: #fff;
          padding: 13px 18px;
          border: 1px solid #eee;
          border-radius: 10px;
          font-weight: 700;
          color: #333;
        }

        .pm-count span {
          color: #dc2626;
          font-size: 20px;
          margin-right: 7px;
        }

        .pm-alert {
          padding: 13px 16px;
          border-radius: 9px;
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: 600;
        }

        .pm-alert.success {
          color: #166534;
          background: #dcfce7;
          border: 1px solid #bbf7d0;
        }

        .pm-alert.error {
          color: #991b1b;
          background: #fee2e2;
          border: 1px solid #fecaca;
        }

        .pm-card {
          background: #fff;
          border: 1px solid #ececec;
          border-radius: 13px;
          padding: 22px;
          margin-bottom: 22px;
          box-shadow: 0 3px 14px rgba(0,0,0,.035);
        }

        .pm-card-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 18px;
          margin-bottom: 22px;
          border-bottom: 1px solid #eee;
        }

        .pm-heading-icon {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          background: #fff0f0;
          color: #dc2626;
          border-radius: 10px;
          font-size: 19px;
          font-weight: 800;
        }

        .pm-card-heading h2 {
          font-size: 18px;
          font-weight: 800;
          margin: 0;
        }

        .pm-card-heading p {
          font-size: 12px;
          color: #888;
          margin: 4px 0 0;
        }

        .pm-section {
          margin-bottom: 27px;
        }

        .pm-section:last-child {
          margin-bottom: 0;
        }

        .pm-section-title {
          font-size: 14px;
          font-weight: 800;
          margin-bottom: 16px;
          color: #333;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pm-section-title:before {
          content: "";
          width: 4px;
          height: 17px;
          background: #dc2626;
          border-radius: 5px;
        }

        .pm-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 17px;
        }

        .pm-field {
          min-width: 0;
        }

        .pm-field label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #444;
          margin-bottom: 7px;
        }

        .pm-required {
          color: #dc2626;
        }

        .pm-field input,
        .pm-field select,
        .pm-field textarea {
          display: block;
          width: 100%;
          min-height: 43px;
          padding: 10px 12px;
          border: 1px solid #dedede;
          border-radius: 7px;
          background: #fff;
          color: #222;
          font-size: 13px;
          outline: none;
          box-sizing: border-box;
          transition: border-color .2s, box-shadow .2s;
        }

        .pm-field input:focus,
        .pm-field select:focus,
        .pm-field textarea:focus {
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220,38,38,.09);
        }

        .pm-field input::placeholder,
        .pm-field textarea::placeholder {
          color: #aaa;
        }

        .pm-field textarea {
          min-height: 125px;
          resize: vertical;
        }

        .pm-field small {
          display: block;
          color: #888;
          font-size: 11px;
          margin-top: 6px;
        }

        .pm-upload {
          display: block;
          border: 2px dashed #e4bcbc;
          background: #fffafa;
          border-radius: 10px;
          padding: 25px 15px;
          text-align: center;
          cursor: pointer;
          transition: .2s;
        }

        .pm-upload:hover {
          border-color: #dc2626;
          background: #fff4f4;
        }

        .pm-upload-icon {
          font-size: 30px;
          color: #dc2626;
          margin-bottom: 8px;
        }

        .pm-upload strong {
          display: block;
          font-size: 14px;
          color: #333;
        }

        .pm-upload small {
          display: block;
          margin-top: 6px;
          color: #888;
          font-size: 11px;
        }

        .pm-upload input {
          display: none;
        }

        .pm-image-heading {
          font-size: 13px;
          font-weight: 800;
          margin: 20px 0 12px;
        }

        .pm-preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(115px, 1fr));
          gap: 12px;
        }

        .pm-preview {
          min-width: 0;
          border: 1px solid #eee;
          padding: 8px;
          border-radius: 9px;
          background: #fff;
        }

        .pm-preview img {
          width: 100%;
          height: 95px;
          object-fit: contain;
          background: #f6f6f6;
          border-radius: 6px;
        }

        .pm-preview button {
          width: 100%;
          margin-top: 7px;
          border: none;
          border-radius: 5px;
          padding: 6px;
          background: #fee2e2;
          color: #b91c1c;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .pm-preview small {
          display: block;
          color: #888;
          font-size: 10px;
          overflow-wrap: anywhere;
          margin-top: 5px;
        }

        .pm-switches {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .pm-switch {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid #eee;
          border-radius: 9px;
          padding: 14px;
          cursor: pointer;
          background: #fafafa;
        }

        .pm-switch input {
          width: 18px;
          height: 18px;
          accent-color: #dc2626;
          cursor: pointer;
        }

        .pm-switch strong {
          display: block;
          font-size: 12px;
        }

        .pm-switch small {
          display: block;
          color: #888;
          font-size: 10px;
          margin-top: 3px;
        }

        .pm-form-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          border-top: 1px solid #eee;
          padding-top: 20px;
          margin-top: 25px;
        }

        .pm-primary,
        .pm-secondary {
          border: none;
          border-radius: 7px;
          padding: 12px 22px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: .2s;
        }

        .pm-primary {
          background: #dc2626;
          color: #fff;
        }

        .pm-primary:hover {
          background: #b91c1c;
        }

        .pm-primary:disabled {
          opacity: .65;
          cursor: not-allowed;
        }

        .pm-secondary {
          background: #eee;
          color: #333;
        }

        .pm-secondary:hover {
          background: #ddd;
        }

        .pm-list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }

        .pm-list-header h2 {
          font-size: 19px;
          font-weight: 800;
          margin: 0;
        }

        .pm-search {
          width: 280px;
          max-width: 100%;
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 7px;
          font-size: 13px;
          outline: none;
        }

        .pm-search:focus {
          border-color: #dc2626;
        }

        .pm-category-tabs {
          display: flex;
          gap: 9px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }

        .pm-category-tabs button {
          border: 1px solid #e5e5e5;
          background: white;
          color: #444;
          padding: 9px 16px;
          border-radius: 7px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: .2s;
        }

        .pm-category-tabs button:hover {
          border-color: #dc2626;
          color: #dc2626;
        }

        .pm-category-tabs button.active {
          background: #dc2626;
          color: white;
          border-color: #dc2626;
        }

        .pm-filter-panel {
          background: #fafafa;
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 18px;
          margin-bottom: 20px;
        }

        .pm-filter-title {
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 14px;
        }

        .pm-filter-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .pm-filter-grid input,
        .pm-filter-grid select {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 7px;
          background: white;
          font-size: 12px;
          outline: none;
        }

        .pm-filter-grid input:focus,
        .pm-filter-grid select:focus {
          border-color: #dc2626;
        }

        .pm-filter-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-top: 14px;
          flex-wrap: wrap;
        }

        .pm-clear-filters {
          border: none;
          background: #fee2e2;
          color: #991b1b;
          padding: 9px 14px;
          border-radius: 6px;
          font-weight: 700;
          cursor: pointer;
        }

        .pm-result-count {
          color: #777;
          font-size: 12px;
          font-weight: 600;
        }

        /* Product card grid */
        .pm-product-list {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .pm-product {
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: 12px;
          border: 1px solid #eee;
          border-radius: 11px;
          background: #fff;
          transition: .2s;
        }

        .pm-product:hover {
          border-color: #dc2626;
          box-shadow: 0 4px 15px rgba(0,0,0,.06);
          transform: translateY(-2px);
        }

        .pm-product-info {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 0;
        }

        .pm-product-info img {
          width: 100%;
          height: 145px;
          object-fit: contain;
          background: #f7f7f7;
          border-radius: 8px;
        }

        .pm-product-details {
          min-width: 0;
        }

        .pm-product-details strong {
          display: block;
          font-size: 13px;
          overflow-wrap: anywhere;
        }

        .pm-product-details p {
          color: #888;
          font-size: 11px;
          margin: 5px 0;
        }

        .pm-product-details small {
          font-weight: 800;
          color: #222;
          font-size: 12px;
        }

        .pm-product-status {
          display: inline-block;
          padding: 4px 7px;
          margin-top: 7px;
          font-size: 10px;
          border-radius: 20px;
          background: #dcfce7;
          color: #166534;
          font-weight: 700;
        }

        .pm-product-status.unavailable {
          background: #fee2e2;
          color: #991b1b;
        }

        .pm-product-actions {
          display: flex;
          gap: 7px;
          margin-top: 12px;
        }

        .pm-product-actions button {
          flex: 1;
          border: none;
          padding: 9px;
          border-radius: 6px;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: .2s;
        }

        .pm-edit {
          background: #222;
        }

        .pm-edit:hover {
          background: #444;
        }

        .pm-delete {
          background: #dc2626;
        }

        .pm-delete:hover {
          background: #b91c1c;
        }

        .pm-empty {
          text-align: center;
          padding: 35px 15px;
          color: #888;
          background: #fafafa;
          border-radius: 9px;
          grid-column: 1 / -1;
        }

        @media (max-width: 1050px) {
          .pm-product-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .pm-filter-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 767px) {
          .pm-page {
            padding: 15px 11px;
          }

          .pm-header h1 {
            font-size: 22px;
          }

          .pm-header p {
            font-size: 12px;
          }

          .pm-count {
            padding: 9px 13px;
            font-size: 12px;
          }

          .pm-count span {
            font-size: 16px;
          }

          .pm-card {
            padding: 15px 12px;
            border-radius: 10px;
          }

          .pm-card-heading {
            margin-bottom: 17px;
          }

          .pm-card-heading h2 {
            font-size: 16px;
          }

          .pm-grid {
            grid-template-columns: 1fr;
            gap: 13px;
          }

          .pm-switches {
            grid-template-columns: 1fr;
          }

          .pm-form-actions button {
            flex: 1;
          }

          .pm-search {
            width: 100%;
          }

          .pm-list-header {
            align-items: stretch;
          }
        }

        @media (max-width: 550px) {
          .pm-product-list {
            grid-template-columns: 1fr;
          }

          .pm-filter-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Page Header */}
      <div className="pm-header">
        <div>
          <div className="pm-eyebrow">IMTIAZ TRADER / ADMIN</div>
          <h1>Product Management</h1>
          <p>Add, update and organize your store products.</p>
        </div>

        <div className="pm-count">
          <span>{products.length}</span>
          Total Products
        </div>
      </div>

      {/* Feedback */}
      {message && (
        <div className={`pm-alert ${messageType}`}>
          {message}
        </div>
      )}

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="pm-card">
        <div className="pm-card-heading">
          <div className="pm-heading-icon">
            {editingId ? "✎" : "+"}
          </div>

          <div>
            <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>
            <p>
              {editingId
                ? "Update your product information below."
                : "Fill in the details to add a product to your store."}
            </p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="pm-section">
          <h3 className="pm-section-title">Basic Information</h3>

          <div className="pm-grid">
            <InputField
              label="Product Name"
              name="name"
              required
              placeholder="e.g. Dell Latitude 5420"
            />

            <InputField
              label="Brand"
              name="brand"
              required
              placeholder="e.g. Dell, HP, Lenovo"
            />

            <div className="pm-field">
              <label htmlFor="category">
                Category <span className="pm-required">*</span>
              </label>

              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>

                {form.category &&
                  !categories.some(
                    (category) => category.name === form.category
                  ) && (
                    <option value={form.category}>
                      {form.category} (Existing category)
                    </option>
                  )}

                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

              {categories.length === 0 && (
                <small>
                  Add categories from Category Management.
                </small>
              )}
            </div>

            <InputField
              label="Condition"
              name="condition"
              placeholder="e.g. New, Used, Refurbished"
            />
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="pm-section">
          <h3 className="pm-section-title">
            Technical Specifications
          </h3>

          <div className="pm-grid">
            <InputField
              label="Processor"
              name="processor"
              placeholder="e.g. Intel Core i5"
            />

            <InputField
              label="Generation"
              name="generation"
              placeholder="e.g. 11th Generation"
            />

            <InputField
              label="RAM"
              name="ram"
              placeholder="e.g. 8GB DDR4"
            />

            <InputField
              label="Storage"
              name="storage"
              placeholder="e.g. 256GB SSD"
            />

            <InputField
              label="Graphics"
              name="graphics"
              placeholder="e.g. Intel UHD Graphics"
            />

            <InputField
              label="Operating System"
              name="operatingSystem"
              placeholder="e.g. Windows 11"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="pm-section">
          <h3 className="pm-section-title">
            Pricing & Availability
          </h3>

          <div className="pm-grid">
            <InputField
              label="Price (PKR)"
              name="price"
              type="number"
              placeholder="e.g. 85000"
              help="Leave empty if you want customers to contact you for price."
            />

            <InputField
              label="Stock Quantity"
              name="stock"
              type="number"
              placeholder="e.g. 10"
              help="Enter the available quantity of this product."
            />

            <InputField
              label="Availability Details"
              name="availability"
              placeholder="e.g. In Stock, Contact to confirm"
            />
          </div>
        </div>

        {/* Description */}
        <div className="pm-section">
          <h3 className="pm-section-title">
            Product Description
          </h3>

          <div className="pm-field">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write a clear description of your product, its features and condition..."
            />
          </div>
        </div>

        {/* Images */}
        <div className="pm-section">
          <h3 className="pm-section-title">Product Images</h3>

          <label htmlFor="productImages" className="pm-upload">
            <div className="pm-upload-icon">＋</div>
            <strong>Click to upload product images</strong>
            <small>
              JPG, PNG, WEBP or GIF · Maximum 5 MB per image · Up to 8 images
            </small>

            <input
              id="productImages"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              onChange={handleImageChange}
            />
          </label>

          {existingImages.length > 0 && (
            <>
              <h4 className="pm-image-heading">Existing Images</h4>

              <div className="pm-preview-grid">
                {existingImages.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="pm-preview"
                  >
                    <img
                      src={getImageUrl(image)}
                      alt={`Existing product ${index + 1}`}
                    />

                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                    >
                      Remove Image
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {previewImages.length > 0 && (
            <>
              <h4 className="pm-image-heading">New Images</h4>

              <div className="pm-preview-grid">
                {previewImages.map((image, index) => (
                  <div key={image.url} className="pm-preview">
                    <img src={image.url} alt={image.name} />

                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                    >
                      Remove Image
                    </button>

                    <small>{image.name}</small>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Product Settings */}
        <div className="pm-section">
          <h3 className="pm-section-title">Product Settings</h3>

          <div className="pm-switches">
            <label className="pm-switch">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />

              <span>
                <strong>Featured Product</strong>
                <small>
                  Highlight this product in your store.
                </small>
              </span>
            </label>

            <label className="pm-switch">
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleChange}
              />

              <span>
                <strong>Available for Customers</strong>
                <small>
                  Allow customers to view this product.
                </small>
              </span>
            </label>
          </div>
        </div>

        {/* Form Buttons */}
        <div className="pm-form-actions">
          <button
            type="submit"
            className="pm-primary"
            disabled={saving}
          >
            {saving
              ? "Saving Product..."
              : editingId
                ? "Save Changes"
                : "Add Product"}
          </button>

          <button
            type="button"
            className="pm-secondary"
            onClick={resetForm}
          >
            {editingId ? "Cancel Editing" : "Reset Form"}
          </button>
        </div>
      </form>

      {/* Product List */}
      <section className="pm-card">
        <div className="pm-list-header">
          <h2>All Products ({filteredProducts.length})</h2>

          <input
            type="search"
            className="pm-search"
            placeholder="Search any product detail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Tabs */}
        <div className="pm-category-tabs">
          <button
            type="button"
            className={!filters.category ? "active" : ""}
            onClick={() =>
              setFilters((previous) => ({
                ...previous,
                category: "",
              }))
            }
          >
            All Products
          </button>

          {uniqueValues("category").map((category) => (
            <button
              type="button"
              key={category}
              className={
                filters.category === category ? "active" : ""
              }
              onClick={() =>
                setFilters((previous) => ({
                  ...previous,
                  category,
                }))
              }
            >
              {category}
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        <div className="pm-filter-panel">
          <div className="pm-filter-title">
            FILTER PRODUCTS
          </div>

          <div className="pm-filter-grid">
            <select
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
            >
              <option value="">All Brands</option>
              {uniqueValues("brand").map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {uniqueValues("category").map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            <select
              name="processor"
              value={filters.processor}
              onChange={handleFilterChange}
            >
              <option value="">All Processors</option>
              {uniqueValues("processor").map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            <select
              name="generation"
              value={filters.generation}
              onChange={handleFilterChange}
            >
              <option value="">All Generations</option>
              {uniqueValues("generation").map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            <select
              name="ram"
              value={filters.ram}
              onChange={handleFilterChange}
            >
              <option value="">All RAM</option>
              {uniqueValues("ram").map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            <select
              name="storage"
              value={filters.storage}
              onChange={handleFilterChange}
            >
              <option value="">All Storage</option>
              {uniqueValues("storage").map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            <select
              name="condition"
              value={filters.condition}
              onChange={handleFilterChange}
            >
              <option value="">All Conditions</option>
              {uniqueValues("condition").map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All Statuses</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
              <option value="featured">Featured</option>
              <option value="not-featured">Not Featured</option>
            </select>

            <input
              type="number"
              name="minPrice"
              placeholder="Minimum Price (PKR)"
              min="0"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />

            <input
              type="number"
              name="maxPrice"
              placeholder="Maximum Price (PKR)"
              min="0"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="name">Name A–Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="pm-filter-actions">
            <span className="pm-result-count">
              Showing {filteredProducts.length} of {products.length} products
            </span>

            <button
              type="button"
              className="pm-clear-filters"
              onClick={clearFilters}
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {loading ? (
          <div className="pm-empty">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="pm-empty">
            {search || Object.values(filters).some(Boolean)
              ? "No matching products found."
              : "No products found."}
          </div>
        ) : (
          <div className="pm-product-list">
            {filteredProducts.map((product) => (
              <div key={product._id} className="pm-product">
                <div className="pm-product-info">
                  <img
                    src={getImageUrl(
                      product.images?.[0] || product.image
                    )}
                    alt={product.name}
                  />

                  <div className="pm-product-details">
                    <strong>{product.name}</strong>

                    <p>
                      {product.brand || "No brand"} ·{" "}
                      {product.category || "No category"}
                    </p>

                    <small>
                      {product.price != null
                        ? `Rs. ${Number(product.price).toLocaleString("en-PK")}`
                        : "Contact for price"}
                    </small>

                    <p>Stock: {product.stock ?? 0} units</p>

                    <span
                      className={`pm-product-status ${
                        product.available === false
                          ? "unavailable"
                          : ""
                      }`}
                    >
                      {product.available === false
                        ? "Unavailable"
                        : "Available"}
                    </span>

                    {product.featured && (
                      <span
                        className="pm-product-status"
                        style={{
                          marginLeft: "6px",
                          background: "#fef3c7",
                          color: "#92400e",
                        }}
                      >
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="pm-product-actions">
                  <button
                    type="button"
                    className="pm-edit"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="pm-delete"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProductManagement;
