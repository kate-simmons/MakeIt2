import style from "../Styles/Home.module.css";
import { CartCard } from "../Components/Card";
import TotalPrice from "../Components/TotalPrice";
import { useOrderValue } from "../Contexts/OrderContext";
import { NavLink } from "react-router-dom";

function Cart() {
  // cart contains all cartitems with their quantity, description, price...
  const { cart } = useOrderValue();

  console.log(cart);
  // if cart is empty this will be returned
  if (cart.length === 0) {
    return (
      <div className={style.emptyCart}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/13637/13637462.png"
          alt="cart"
        />
        <h1>Cart is empty</h1>
        <button className={style.button}>
          {" "}
          <NavLink to="/">Return To Shop</NavLink>
        </button>
      </div>
    );
  }
  // based on cart , cartcards are mapped
  return (
    <>
      <div className={style.homePage}>
        <h1 className="pb-2 mx-auto text-black-500 text-4xl font-medium w-9/12 mt-10 poppins border-b border-dotted border-b-gray-500">
          My Cart
        </h1>
        <div
          className={
            " w-9/12 mx-auto py-16  flex flex-wrap gap-12 justify-evenly"
          }
        >
          {cart.map((product, index) => (
            <CartCard key={index} product={product} />
          ))}
        </div>
        <TotalPrice />
      </div>
    </>
  );
}

export default Cart;
