import style from "../Styles/Orders.module.css";

// This is the ordertable for every order the user place.
function OrderTable({ order }) {
  // this order prop comes form parent here which is... Orders page
  // every order will have its not information which will be added to table below
  const { date, cartItems, totalPrice } = order;
  return (
    <div className={`${style.order} poppins`}>
      <h3 className={style.orderDate}>Ordered On: &nbsp; {date}</h3>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>₹ {item.price}</td>
              <td>{item.qty}</td>
              <td>₹ {item.qty * item.price}</td>
            </tr>
          ))}
          <tr className={style.lastRow}>
            <td colSpan={4} className="border-t border-gray-200">
              <p>Delivery Fee: ₹ {0}/- </p> <p>Platform Fee: ₹ {3}/- </p>
              <p className="font-semibold">Grand Total: ₹ {totalPrice}/-</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
