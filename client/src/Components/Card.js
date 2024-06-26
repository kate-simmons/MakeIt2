import { Link, useNavigate } from "react-router-dom";
import style from "../Styles/Card.module.css";
import { useOrderValue } from "../Contexts/OrderContext";
import { toast } from "react-toastify";
import { useValue } from "../Contexts/AuthContext";

//Two cards are defined here,

// A) This is the card for products on homepage
function Card({ product, item }) {
  const { SignedIn } = useValue();
  return (
    <div className="w-[310px] max-w-sm  rounded-lg shadow bg-gray-800 border-gray-700 my-6">
      <a href="#">
        <img
          className="p-8 rounded-t-lg"
          style={{ maxHeight: "240px", minHeight: "240px", width: "100%" }}
          src={product.image}
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-white">
            {product.name}
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            4.0
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-white">
            Rs. {product.price}
          </span>
          <Link
            to={SignedIn ? `/${item}/details/${product.id}` : "/signin"}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
}

// B) This is the card for products in Cart
export function CartCard({ product }) {
  // these all are functions that handle different funciton of cartcard
  // incQty is for + icon on card it increases the quantity of item in cart
  // decQty is for - icon , it decreases the qty of item in cart
  // removeFromCart is for "Remove From Cart" btn
  const { incQty, decQty, removeFromCart } = useOrderValue();

  return (
    <div className={`${style.Card} shadow-xl border border-gray-250`}>
      <div className={style.productDetails}>
        <div>
          <img className={style.img} alt="Product" src={product.image} />
        </div>
        <div className={`${style.productDescription} my-2 font-semibold`}>
          {product.name}
        </div>
        <div className={`${style.qtyNprice} `}>
          <h2 className="font-semibold text-[20px] text-gray-500">
            ₹ {product.price}
          </h2>
          <div className={style.qtyBtns}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1828/1828899.png"
              alt="minus"
              onClick={() => decQty(product.id)}
            />
            <span>{product.qty}</span>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1828/1828919.png"
              alt="plus"
              onClick={() => incQty(product.id)}
            />
          </div>
        </div>
      </div>
      <button
        className={`${style.button} ${style.removeBtn}`}
        onClick={() => {
          removeFromCart(product.id);
          toast.success("Product Removed Successfully");
        }}
      >
        Remove From Cart
      </button>
    </div>
  );
}

export default Card;
