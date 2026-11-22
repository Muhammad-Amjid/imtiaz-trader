import React, { useEffect, useState } from "react";

const API = "https://imtiaz-trader-api.vercel.app/api/categories";

function CategoryManagement() {
  const token = localStorage.getItem("adminToken");

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const loadCategories = async () => {
    try {
      const response = await fetch(`${API}/admin/all`, {
        headers,
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setCategories(data.categories || []);
    } catch (error) {
      setMessage(error.message || "Could not load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(editingId ? `${API}/${editingId}` : API, {
        method: editingId ? "PUT" : "POST",
        headers,
        body: JSON.stringify({ name, description }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setMessage(editingId ? "Category updated." : "Category created.");
      resetForm();
      loadCategories();
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    }
  };

  const editCategory = (category) => {
    setEditingId(category._id);
    setName(category.name);
    setDescription(category.description || "");
  };

  const toggleCategory = async (category) => {
    try {
      const response = await fetch(`${API}/${category._id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ active: !category.active }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      loadCategories();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setMessage("Category deleted.");
      loadCategories();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Categories Management</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <div className="card shadow-sm border-0 p-4 mb-4">
        <h5 className="mb-3">
          {editingId ? "Edit Category" : "Add New Category"}
        </h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Category Name</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter category description"
            />
          </div>

          <button className="btn btn-danger me-2" type="submit">
            {editingId ? "Update Category" : "Add Category"}
          </button>

          {editingId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="card shadow-sm border-0 p-3">
        <h5 className="mb-3">All Categories</h5>

        {loading ? (
          <p>Loading categories...</p>
        ) : categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td className="fw-semibold">{category.name}</td>
                    <td>{category.description || "—"}</td>
                    <td>
                      <span
                        className={`badge ${
                          category.active ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {category.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2 mb-1"
                        onClick={() => editCategory(category)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-outline-secondary me-2 mb-1"
                        onClick={() => toggleCategory(category)}
                      >
                        {category.active ? "Disable" : "Enable"}
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger mb-1"
                        onClick={() => deleteCategory(category._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryManagement;
