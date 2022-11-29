// TODO: create a component that displays a single bakery item

export default function BakeryItem({ item, index, addToCart }) {
  return (
    <div class="SingleItem">
      <h2>
        {index} {item.name}
      </h2>
      <img src={item.image} alt="Pastries" />
      <button onClick={() => addToCart(index, item)}>add to favorites</button>
    </div>
  );
}
