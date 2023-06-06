import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import AddItems from "./AddItems";
import SearchItems from "./SearchItems";
import apiRequest from "./apiRequest";

function App() {
  let API_URL = "http://localhost:3500/items";
  let [items, setItems] = useState([]);
  let [search, setSearch] = useState("");
  let [newItem, setNewItem] = useState("");
  let [fetchError, setFetchError] = useState(null);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let fetchItems = async () => {
      try {
        let response = await fetch(API_URL);
        if (!response.ok) throw Error("Data not received");
        let listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  let addItem = async (item) => {
    let id = items.length ? items[items.length - 1].id + 1 : 1;
    let addNewItem = { id, checked: false, item };
    let listItems = [...items, addNewItem];
    setItems(listItems);

    let postOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addNewItem),
    };
    let result = await apiRequest(API_URL, postOption);
    if (result) setFetchError(result);
  };

  let handleCheck = async (id) => {
    let listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    let myItem = listItems.filter((item) => item.id == id);
    let updateOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    let reqURL = `${API_URL}/${id}`;
    let result = await apiRequest(reqURL, updateOption);
    if (result) setFetchError(result);
  };

  let handleDelete = async (id) => {
    let listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    let deleteOption = {
      method: "DELETE",
    };
    let reqURL = `${API_URL}/${id}`;
    let result = await apiRequest(reqURL, deleteOption);
    if (result) setFetchError(result);
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
      <main>
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {isLoading && <p>Loading..</p>}
        {!isLoading && !fetchError && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}
export default App;
