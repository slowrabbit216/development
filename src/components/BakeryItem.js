// TODO: create a component that displays a single bakery item

export default function BakeryItem({ item, index, addToCart, removeFromCart }) {
  return (
    <div class="SingleItem">
      <h2>{item.name}</h2>
      <p>{"Calories :" + item.calories}</p>
      <p>{"Price :" + item.price}</p>

      <img src={item.image} alt="Pastries" />
      <button onClick={() => addToCart(index, item)}>add to favorites</button>
      <button onClick={() => removeFromCart(item)}>
        remove from favorites
      </button>
    </div>
  );
}
