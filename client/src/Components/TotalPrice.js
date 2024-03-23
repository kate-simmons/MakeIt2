import { useNavigate } from "react-router-dom";
import { useOrderValue } from "../Contexts/OrderContext";
import style from "../Styles/cart.module.css";

// This component if part of "Cart" page, it contains the information about totalPrice of cart items and the button to purchase cartItems
function TotalPrice() {
  const { TotalPrice, addOrder } = useOrderValue();
  const navigate = useNavigate();
  //this funciton invokes when Purchase button is pressed, it places a new order
  const handleOrder = () => {
    addOrder();
    navigate("/Orders");
  };

  return (
    <div className="w-4/12 shadow mx-auto p-8 bg-gray-200 rounded-lg my-10">
      <h1 className=" w-10/12 mx-auto poppins text-xl font-semibold mb-4">
        Order:
      </h1>
      <h3 className=" w-8/12 mx-auto flex justify-between font-medium text-md poppins">
        <p>Total Price:-</p> <p>₹{TotalPrice}/-</p>
      </h3>
      <h3 className="border-y border-gray-500 py-2 w-8/12 mx-auto flex justify-between font-medium text-md poppins my-2">
        <p>Delivery Charges:-</p> <p>free</p>
      </h3>
      <h3 className=" w-8/12 mx-auto flex justify-between font-medium text-md poppins mb-4">
        <p>Platform Fee:-</p> <p>₹{3}/-</p>
      </h3>

      <h3 className=" w-9/12 mx-auto flex justify-between font-semibold text-md poppins mb-4">
        <p>Grand Total:-</p> <p>₹{TotalPrice + 3}/-</p>
      </h3>
      <div className="w-10/12 mx-auto">
        <button className={`${style.btn} font-semibold `} onClick={handleOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default TotalPrice;
