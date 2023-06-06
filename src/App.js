import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import AddItems from "./AddItems";
import SearchItems from "./SearchItems";

function App() {
  let [items, setItems] = useState(
    JSON.parse(localStorage.getItem("todoList"))
  );
  let [search, setSearch] = useState("");
  let [newItem, setNewItem] = useState("");
  let addItem = (item) => {
    let id = items.length ? items[items.length - 1].id + 1 : 1;
    let addNewItem = { id, checked: false, item };
    let listItems = [...items, addNewItem];
    setItems(listItems);
    localStorage.setItem("todoList", JSON.stringify(listItems));
  };

  let handleCheck = (id) => {
    let listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    localStorage.setItem("todoList", JSON.stringify(listItems));
  };

  let handleDelete = (id) => {
    let listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    localStorage.setItem("todoList", JSON.stringify(listItems));
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div>
      <Header title="To-do List" />
      <AddItems
        newItem={newItem}
        setNewItems={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItems search={search} setSearch={setSearch} />
      <Content
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}
export default App;
