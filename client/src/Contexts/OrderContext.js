import {
  createContext,
  useReducer,
  useState,
  useContext,
  useEffect,
} from "react";
import db from "../firebaseinit";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth } from "../firebaseinit";
import { useValue } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const orderContext = createContext();

//Reducer function for Cart State, it performs two actions . Either add one item to cart or update cart with new array.
function cartReducer(state, action) {
  const { payload } = action;
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, payload];
    case "UPDATE_ALL":
      return payload.arr;
    default:
      return [];
  }
}

//Reducer function for Order State, it performs two actions . Either add new order or update Order state with new array.
function orderReducer(state, action) {
  const { payload } = action;
  switch (action.type) {
    case "ADD_ORDER":
      return [...state, payload.order];
    case "UPDATE_ALL":
      return payload.arr;
    default:
      return [];
  }
}

function OrderContext({ children }) {
  const [orders, setOrders] = useReducer(orderReducer, []);
  const [cart, setCart] = useReducer(cartReducer, []);
  const [Products, setProducts] = useState({});
  const [TotalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { SignedIn } = useValue();
  const currentUser = auth.currentUser; //current Signed In user, if no one then it will be Null

  // function to update orders in database as new order is added
  const addOrderToDatabase = async (newOrder) => {
    await updateDoc(doc(db, currentUser.uid, "Orders"), {
      myorders: arrayUnion(newOrder),
    });
  };

  // function to add new order
  const addOrder = () => {
    const date = String(new Date()).substring(0, 15);
    const newOrder = {
      date: `${date.slice(3)}, ${date.substring(0, 3)}`,
      cartItems: cart,
      totalPrice: TotalPrice+3,
    };

    addOrderToDatabase(newOrder);
    setOrders({ type: "ADD_ORDER", payload: { order: newOrder } });
    setCart({ type: "EMPTY", payload: {} });
    
    console.log(orders);
  };

  //If item is not present in cart -> Add it to cart, else increase its quantity (qty)
  const addToCart = async (data) => {
    if (cart.find((p) => p.id === data.id)) {
      await incQty(data.id);
      return "updated";
    } else {
      const item = Products[data.type].find((item) => item.id === data.id);
      setCart({ type: "ADD_ITEM", payload: { ...item, qty: 1 } });
      try {
        await fetch("http://localhost:4100/api/user/addToCart", {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            name: item.name,
            image: item.image,
            price: item.price,
            qty: 1,
            uid: SignedIn,
          }),
        });
        return "added";
      } catch (err) {
        console.log("Error while adding to cart: ", err.message);
      }
    }
  };

  //remove item from cart
  const removeFromCart = async (id) => {
    const arr = cart.filter((p) => {
      if (p.id === id) {
        return false;
      }
      return true;
    });
    console.log(id);
    setCart({ type: "UPDATE_ALL", payload: { arr: arr } });
    try {
      await fetch("http://localhost:4100/api/user/removeFromCart", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          uid: SignedIn,
        }),
      });
      return "item removed";
    } catch (err) {
      console.log("Error while removing item from cart: ", err.message);
    }
  };

  //increase product qty in cart
  const incQty = async (id) => {
    const arr = cart.map((p) => {
      if (p.id === id) {
        p.qty += 1;
      }
      return p;
    });

    setCart({ type: "UPDATE_ALL", payload: { arr: arr } });
    try {
      await fetch("http://localhost:4100/api/user/increaseQty", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          uid: SignedIn,
        }),
      });
      return "qty increased";
    } catch (err) {
      console.log("Error while increasing item qty in cart: ", err.message);
    }
  };

  //decrease product qty in cart
  const decQty = async (id) => {
    const arr = cart.filter((p) => {
      if (p.id === id) {
        p.qty -= 1;
        if (p.qty <= 0) return false;
      }
      return true;
    });

    setCart({ type: "UPDATE_ALL", payload: { arr: arr } });
    try {
      await fetch("http://localhost:4100/api/user/decreaseQty", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          uid: SignedIn,
        }),
      });
      return "qty decreased";
    } catch (err) {
      console.log("Error while decreasing item qty in cart: ", err.message);
    }
  };

  //Maintaining total product based on cart
  useEffect(() => {
    let tot = 0;
    for (let p of cart) {
      tot += p.price * p.qty;
    }
    setTotalPrice(tot);
  }, [cart]);

  useEffect(() => {
    console.log(Products);
  }, [Products]);

  //Fetching products from database
  useEffect(() => {
    async function fetchProducts() {
      const resbrkfst = await fetch(
        "http://localhost:4100/api/product/breakfast"
      );
      const reslunch = await fetch("http://localhost:4100/api/product/lunch");
      const resdinner = await fetch("http://localhost:4100/api/product/dinner");
      const ressnacks = await fetch("http://localhost:4100/api/product/snacks");
      const breakfast = await resbrkfst.json();
      const dinner = await resdinner.json();
      const lunch = await reslunch.json();
      const snacks = await ressnacks.json();
      // console.log(breakfast, dinner, lunch, snacks);
      setProducts({
        breakfast: breakfast.data,
        lunch: lunch.data,
        dinner: dinner.data,
        snacks: snacks.data,
      });
    }
    fetchProducts();
    setIsLoading(false);
  }, []);

  // fetching users data as user signed In
  useEffect(() => {
    async function fetchMyData() {
      const orderData = await getDoc(doc(db, currentUser.uid, "Orders"));
      if (orderData && orderData.data()) {
        setOrders({
          type: "UPDATE_ALL",
          payload: { arr: orderData.data().myorders },
        });
      }
      const cartData = await getDoc(doc(db, currentUser.uid, "Cart"));
      if (cartData && cartData.data()) {
        setCart({
          type: "UPDATE_ALL",
          payload: { arr: cartData.data().mycart },
        });
      }
      setIsLoading(false);
    }

    if (currentUser) {
      setIsLoading(true);
      fetchMyData();
    }
  }, [currentUser]);

  return (
    <orderContext.Provider
      value={{
        Products,
        setProducts,
        cart,
        setCart,
        setOrders,
        addToCart,
        incQty,
        decQty,
        TotalPrice,
        removeFromCart,
        addOrder,
        orders,
        isLoading,
      }}
    >
      {children}
    </orderContext.Provider>
  );
}

//custom hook
function useOrderValue() {
  const data = useContext(orderContext);
  return data;
}

export { useOrderValue };
export default OrderContext;
