import style from "../Styles/Orders.module.css";

// This is the ordertable for every order the user place.
function OrderTable({ order }) {
  // this order prop comes form parent here which is... Orders page
  // every order will have its not information which will be added to table below
  const { date, cartItems, totalPrice, address } = order;
  return (
    <div className={`${style.order} poppins border `}>
      <h3 className={style.orderDate}>Ordered On: &nbsp; {date}</h3>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Item</th>
            {cartItems[0].selected.length ? <th>Ingredients</th> : null}
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="py-2">
                  <p>{item.name}</p>
                  {item.packet ? <p>packet (1 Serving)</p> : null}
                </div>
              </td>
              {cartItems[0].selected.length ? (
                <td className="w-[250px] px-2 py-4">
                  <ol className="text-left text-[12px] ">
                    {cartItems[0].selected.map((sel, k) => (
                      <li key={k}>
                        {k + 1}.&nbsp;
                        {sel}
                      </li>
                    ))}
                  </ol>
                </td>
              ) : null}

              <td>₹ {item.price}</td>
              <td>{item.qty}</td>
              <td>₹ {item.qty * item.price}</td>
            </tr>
          ))}
          <tr className="text-right">
            <td
              colSpan={cartItems[0].selected.length ? 5 : 4}
              className="border-t border-gray-200"
            >
              <p className="font-semibold pr-7">
                Address: <span className="font-medium">{address}</span>
              </p>
            </td>
          </tr>
          <tr className={style.lastRow}>
            <td
              colSpan={cartItems[0].selected.length ? 5 : 4}
              className="border-t border-gray-200"
            >
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
