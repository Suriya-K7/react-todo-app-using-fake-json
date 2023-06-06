import React from "react";
import { FaPlus } from "react-icons/fa";

const AddItems = ({ newItem, setNewItems, handleSubmit }) => {
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem">Add Item</label>
      <input
        type="text"
        placeholder="Add Item"
        id="addItem"
        autoFocus
        autoComplete="off"
        required
        value={newItem}
        onChange={(e) => setNewItems(e.target.value.trim())}
      />
      <button type="submit" aria-label="Add item">
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItems;
