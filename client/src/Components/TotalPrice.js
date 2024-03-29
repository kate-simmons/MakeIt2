import { useNavigate } from "react-router-dom";
import { useOrderValue } from "../Contexts/OrderContext";
import style from "../Styles/cart.module.css";
import { toast } from "react-toastify";
import { useState } from "react";

// This component if part of "Cart" page, it contains the information about totalPrice of cart items and the button to purchase cartItems
function TotalPrice() {
  const { TotalPrice, addOrder } = useOrderValue();
  const navigate = useNavigate();
  const [address, setAddress] = useState();

  const paymentHandler = async (e) => {
    e.preventDefault();
    const amount = TotalPrice + 3;
    const currency = "INR";
    const receipt = "qwsaqi";

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/user/orders`,
      {
        method: "Post",
        body: JSON.stringify({
          amount: amount,
          receipt: receipt,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const order = await response.json();

    var options = {
      key: "rzp_test_tSTYAFl1yflTl1", // Enter the Key ID generated from the Dashboard
      amount: TotalPrice + 3, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: currency,
      name: "Make-It", //your business name
      description: "Test Transaction",
      image: "https://cdn-icons-png.flaticon.com/128/3170/3170733.png",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (res) {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/user/order/validate`,
          {
            method: "Post",
            body: JSON.stringify(res),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        handleOrder(e);
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  const handleAddress = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  };
  //this funciton invokes when Purchase button is pressed, it places a new order
  const handleOrder = (e) => {
    addOrder(address);
    toast.success("Order placed successfully");
    navigate("/Orders");
  };

  return (
    <form onSubmit={paymentHandler}>
      <div className="w-4/12 shadow mx-auto p-8 bg-gray-200 rounded-lg my-10">
        <div className=" mb-6">
          <h1 className=" w-10/12 mx-auto poppins text-xl font-semibold mb-4">
            Your Address:
          </h1>
          <div className="flex justify-center">
            <input
              type="text"
              name="address"
              onChange={handleAddress}
              className="w-9/12 shadow-lg  rounded-md py-2 outline-gray-400 px-4 font-semibold"
              placeholder="address..."
              required
            />
          </div>
        </div>
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
          <button className={`${style.btn} font-semibold `} type="submit">
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
}

export default TotalPrice;
