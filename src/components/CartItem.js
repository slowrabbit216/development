export default function CartItem({ item, removeFromCart }) {
  return (
    <div class="SingleCartItem">
      {item.name}
      {console.log(item)}
      <button onClick={() => removeFromCart(item)}>Remove</button>
    </div>
  );
}
