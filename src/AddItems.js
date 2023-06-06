import React from "react";
import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

const AddItems = ({ newItem, setNewItems, handleSubmit }) => {
  let inputRef = useRef();
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem">Add Item</label>
      <input
        type="text"
        placeholder="Add Item"
        id="addItem"
        ref={inputRef}
        autoFocus
        autoComplete="off"
        required
        value={newItem}
        onChange={(e) => setNewItems(e.target.value.trim())}
      />
      <button
        type="submit"
        onClick={() => inputRef.current.focus()}
        aria-label="Add item"
      >
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItems;
