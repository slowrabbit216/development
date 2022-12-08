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
    if (!myCart.includes(item)) {
      setMyCart([...myCart, item]);
      setMyPrice(myPrice + item.price);
    }
  }

  function removeFromCart(item) {
    if (myCart.includes(item)) {
      setMyCart(myCart.filter((name) => name !== item));
      setMyPrice(myPrice - item.price);
    }
  }

  function filterPrice(minPrice, maxPrice) {
    setDisplayArray(
      bakeryData.filter(
        (pastry) => (pastry.price > minPrice) & (pastry.price < maxPrice)
      )
    );
  }

  function filterCalories(minCalories, maxCalories) {
    setDisplayArray(
      bakeryData.filter(
        (pastry) =>
          (pastry.calories > minCalories) & (pastry.calories < maxCalories)
      )
    );
  }

  function sortCheaptoExpensive() {
    setDisplayArray([...displayArray.sort((a, b) => a.price - b.price)]);
  }

  function sortExpensivetoCheap() {
    setDisplayArray([...displayArray.sort((a, b) => b.price - a.price)]);
  }

  function reset() {
    setDisplayArray(bakeryData);
  }

  function myFunction(id) {
    console.log("here");
    document.getElementById(id).classList.toggle("show");
  }

  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  return (
    <div className="App">
      <h1>Brown Street Bakery</h1> {/* TODO: personalize your bakery (if you want) */}
      <div class="dropdown">
        <button onClick={() => myFunction("filterPrice")} class="dropbtn">
          Filter By Price
        </button>
        <div id="filterPrice" class="dropdown-content">
          <button onClick={() => filterPrice(0, 5)}> Less than $4</button>
          <button onClick={() => filterPrice(4, 10)}>
            {" "}
            Between $4 and $10
          </button>
          <button onClick={() => filterPrice(0, 100)}> All</button>
        </div>
      </div>
      <div class="dropdown">
        <button onClick={() => myFunction("filterCalories")} class="dropbtn">
          Filter By Calories
        </button>
        <div id="filterCalories" class="dropdown-content">
          <button onClick={() => filterCalories(0, 500)}> Low Calories</button>
          <button onClick={() => filterCalories(500, 1000)}>
            High Calories
          </button>
          <button onClick={() => filterCalories(0, 10000)}> All</button>
        </div>
      </div>
      <div class="dropdown">
        <button onClick={() => myFunction("sortPrice")} class="dropbtn">
          Sort By Price
        </button>
        <div id="sortPrice" class="dropdown-content">
          <button onClick={() => sortCheaptoExpensive()}>
            Sort: Least Expensive - Most Expensive
          </button>
          <button onClick={() => sortExpensivetoCheap()}>
            Sort: Most Expensive - Least Expensive
          </button>
        </div>
      </div>
      <button onClick={() => reset()}> Reset</button>
      <div class="ItemContainer">
        {displayArray.map((item, index) => (
          <BakeryItem
            key={index}
            item={item}
            index={index}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
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
