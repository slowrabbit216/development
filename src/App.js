import "./App.css";
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem.js";
import CartItem from "./components/CartItem";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  const [myCart, setMyCart] = useState([]);
  const [myPrice, setMyPrice] = useState(0);
  const [displayArray, setDisplayArray] = useState(bakeryData);

  function addToCart(index, item) {
    if (!myCart.includes(item.name)) {
      setMyCart([...myCart, item.name]);
      setMyPrice(myPrice + item.price);
    }
  }

  function removeFromCart(itemName) {
    console.log(itemName, "here", myCart);
    if (myCart.includes(itemName))
      setMyCart(myCart.filter((name) => name !== itemName));
  }

  function filterPrice(maxPrice) {
    setDisplayArray(displayArray.filter((pastry) => pastry.price < maxPrice));
  }

  function filterCalories(maxCalories) {
    setDisplayArray(
      displayArray.filter((pastry) => pastry.calories < maxCalories)
    );
  }

  function sortCheaptoExpensive() {
    setDisplayArray([...displayArray.sort((a, b) => a.price - b.price)]);
  }

  function reset() {
    setDisplayArray(bakeryData);
  }

  return (
    <div className="App">
      <h1>My Bakery</h1> {/* TODO: personalize your bakery (if you want) */}
      <button onClick={() => filterPrice(5)}> Less than $5</button>
      <button onClick={() => filterCalories(500)}> Low Calories</button>
      <button onClick={() => sortCheaptoExpensive()}>
        Sort: Least Expensive - Most Expensive
      </button>
      <button onClick={() => reset()}> All</button>
      <div class="ItemContainer">
        {displayArray.map((item, index) => (
          <BakeryItem
            key={index}
            item={item}
            index={index}
            addToCart={addToCart}
          />
        ))}
      </div>
      <div>
        <h2>Favorites</h2>{" "}
        {myCart.map((item) => (
          <CartItem item={item} removeFromCart={removeFromCart} />
        ))}
        <h2>Total: {myPrice}</h2>
      </div>
    </div>
  );
}

export default App;
