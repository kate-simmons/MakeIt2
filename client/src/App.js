import Navbar from "./Components/Navbar";
import Cart from "./Pages/Cart";
import Orders from "./Pages/Orders";
import SignIn from "./Pages/SignIn";
import RegisterUser from "./Pages/RegisterUser";
import SomethingWentWrong from "./Components/SomethingWentWrong";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useValue } from "./Contexts/AuthContext";
import OrderContext from "./Contexts/OrderContext";
import Footer from "./Components/Footer";
import Breakfast from "./Pages/Breakfast";
import Dinner from "./Pages/Dinner";
import Lunch from "./Pages/Lunch";
import Snacks from "./Pages/Snacks";
import ProductDetails from "./Pages/ProductDetails";
function App() {
  // state 'SignedIn' taken from Authcontext using useValue() custom hook
  const { SignedIn } = useValue();

  //Protected route is created for components that are private to each user. If you are signed in it will give access orders and cart
  const ProtectRoute = ({ children }) => {
    if (!SignedIn) return <Navigate to={"/"} replace={true} />;
    else {
      return children;
    }
  };

  //router is defined usig=ng createBRowserRouter, it contain two protected routes [ Orders and Cart]
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <SomethingWentWrong />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "Orders",
          element: (
            <ProtectRoute>
              <Orders />
            </ProtectRoute>
          ),
        },
        {
          path: "Cart",
          element: (
            <ProtectRoute>
              <Cart />
            </ProtectRoute>
          ),
        },
        {
          path: "Breakfast",
          element: <Breakfast />,
        },
        {
          path: "Dinner",
          element: <Dinner />,
        },
        {
          path: "Lunch",
          element: <Lunch />,
        },
        {
          path: "Snacks",
          element: <Snacks />,
        },
        {
          path: "details",
          element: <ProductDetails />,
        },
        {
          path: "Signin",
          element: <SignIn />,
        },
        {
          path: "/Signup",
          element: <RegisterUser />,
        },
        {
          path: "/:item/details/:id",
          element: <ProductDetails />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <OrderContext>
        <RouterProvider router={router} />
        <ToastContainer />
      </OrderContext>
      <Footer />
    </div>
  );
}

export default App;
