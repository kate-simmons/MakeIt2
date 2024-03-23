import { Outlet, Link } from "react-router-dom";
import style from "../Styles/Navbar.module.css";
import { toast } from "react-toastify";
import { useValue } from "../Contexts/AuthContext";

//Navbar Component
function Navbar() {
  const { SignedIn, setSignedIn, signOut } = useValue();

  //function to handle when signout is clicked
  const handleSignOut = () => {
    setSignedIn(false);
    toast.success("User SIgned Out");
    signOut(); //this function is taken from authContext using custom hook useValue();
  };

  //Images and Links are set based on 'SignedIn' state
  //At last outlet is defined for all its child components/pages
  return (
    <>
      <div className={style.Navbar}>
        <Link to="/" className="font-semibold flex  items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3170/3170733.png"
            className="h-[40px]"
          />
          <span className="poppins"> Make-It</span>
        </Link>
        <div className={style.RightContainer}>
          <div
            className={style.NavIcon}
            onClick={() => {
              if (SignedIn) {
                handleSignOut();
              }
            }}
          >
            <Link to={!SignedIn ? "Signin" : "/"} className="poppins text-sm">
              {SignedIn ? " Sign Out" : "Sign In"}
            </Link>
          </div>
          {SignedIn ? (
            <>
              <div className={style.NavIcon}>
                <Link to={"Cart"} className="poppins text-sm">
                  Cart
                </Link>
              </div>
              <div className={style.NavIcon}>
                <Link to={"Orders"} className="poppins text-sm">
                  My Orders
                </Link>
              </div>
            </>
          ) : null}
          <div className={style.NavIcon}>
            <Link to="Dinner" className="poppins text-sm">
              Dinner
            </Link>
          </div>
          <div className={style.NavIcon}>
            <Link to="Snacks" className="poppins text-sm">
              Snacks
            </Link>
          </div>
          <div className={style.NavIcon}>
            <Link to="Lunch" className="poppins text-sm">
              Lunch
            </Link>
          </div>
          <div className={style.NavIcon}>
            <Link to="Breakfast" className="poppins text-sm">
              Breakfast
            </Link>
          </div>
          <div className={style.NavIcon}>
            <Link className="poppins text-sm">Home</Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
export default Navbar;
