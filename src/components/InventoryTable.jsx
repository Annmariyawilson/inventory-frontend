import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { deleteItem } from "../api"; 

const InventoryTable = ({ items, setItems, setIsEditing, setEditingItem }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      const updatedItems = items.filter((item) => item._id !== id);
      setItems(updatedItems);

      if (currentPage > 1 && updatedItems.length <= (currentPage - 1) * itemsPerPage) {
        setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-3">📦 Inventory List</h4>
      <table className="table table-bordered table-hover text-center">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <tr
                key={item._id}
                className={
                  item.quantity === 0
                    ? "table-danger"
                    : item.quantity < 10
                    ? "table-warning"
                    : ""
                }
              >
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td className="fw-bold">{item.quantity}</td>
                <td>
                  <button
                    onClick={() => handleEdit(item)}
                    className="btn btn-outline-primary btn-sm me-2"
                    title="Edit Item"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-outline-danger btn-sm"
                    title="Delete Item"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-muted">No items found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-light border me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prevPage) => Math.max(1, prevPage - 1))}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <span className="align-self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-light border ms-2"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1))}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;
