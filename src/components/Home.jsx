import React, { useState, useEffect } from "react";
import InventoryTable from "./InventoryTable";
import { ToastContainer, toast } from "react-toastify";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getInventory, addItem, updateItem, deleteItem } from "../api";

const Home = ({ isAuthenticated }) => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [originalItems, setOriginalItems] = useState([]);  

  useEffect(() => {
    if (isAuthenticated) {
      getInventory()
        .then((data) => {
          setItems(data);
          setOriginalItems(data);
        })
        .catch(() => toast.error("Failed to fetch inventory!"));
    }
  }, [isAuthenticated]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const addedItem = await addItem(newItem);
      setItems([addedItem, ...items]); 
      setNewItem({ name: "", category: "", quantity: 0 });
      toast.success("Item added successfully!");
    } catch {
      toast.error("Failed to add item!");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEditItem = async (e) => {
    e.preventDefault();
    if (!editingItem?._id) return;
    try {
      const updatedItem = await updateItem(editingItem._id, editingItem);
      setItems(items.map((item) => (item._id === editingItem._id ? updatedItem : item)));
      setIsEditing(false);
      setEditingItem(null);
      toast.success("Item updated successfully!");
    } catch {
      toast.error("Failed to update item!");
    }
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Item Name', 'Category', 'Quantity']],
      body: items.map(item => [item.name, item.category, item.quantity]),
    });
    doc.save('inventory.pdf');
  };

  const handleSortByQuantity = () => {
    const sortedItems = [...items].sort((a, b) =>
      sortDirection === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity
    );
    setItems(sortedItems);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleResetSort = () => {
    setItems(originalItems); 
    setSortDirection("asc"); 
  };

  return (
    <div className="container-fluid mt-5">
      <ToastContainer />
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text"><i className="fas fa-search"></i></span>
            <input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by item name or category"
            />
          </div>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn btn-success me-2" onClick={handleExportToPDF}>
            <i className="fas fa-file-pdf"></i> Export as PDF
          </button>
          <button
            className={`btn ${sortDirection === "asc" ? "btn-primary" : "btn-warning"} me-2`}
            onClick={handleSortByQuantity}
          >
            <i className="fas fa-sort"></i> Sort by Quantity ({sortDirection === "asc" ? "Ascending" : "Descending"})
          </button>
          <button className="btn btn-secondary" onClick={handleResetSort}>
            <i className="fas fa-sync"></i> Reset Sort
          </button>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Add New Item</h5>
          <form onSubmit={handleAddItem}>
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="Item Name"
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  placeholder="Category"
                  required
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })}
                  placeholder="Quantity"
                  required
                />
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-primary w-100">Add Item</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {isEditing && editingItem && (
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Edit Item</h5>
            <form onSubmit={handleEditItem}>
              <div className="row">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="number"
                    className="form-control"
                    value={editingItem.quantity}
                    onChange={(e) => setEditingItem({ ...editingItem, quantity: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div className="col-md-2">
                  <button type="submit" className="btn btn-primary w-100">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <InventoryTable
        items={items.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        setItems={setItems}
        setIsEditing={setIsEditing}
        setEditingItem={setEditingItem}
        deleteItem={deleteItem}
      />
    </div>
  );
};

export default Home;
