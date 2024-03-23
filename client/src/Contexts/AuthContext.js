import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

//this function takes out main error from the returned error and return it back to show it in toast
function getError(error) {
  const err = error.message;
  const I1 = err.indexOf("/");
  const I2 = err.indexOf(")");
  return err.substring(I1 + 1, I2);
}

function Authentication({ children }) {
  const [SignedIn, setSignedIn] = useState(false);

  // function to signout the current signed in user
  const signOut = async () => {
    try {
      const response = await fetch("http://localhost:4100/api/user/signout", {
        method: "Post",
      });
      const res = await response.json();
      localStorage.removeItem("uid");
      setSignedIn(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  // function to handle signUp of new user using firebase authentication
  const signUp = async (N, E, P) => {
    try {
      const response = await fetch("http://localhost:4100/api/user/signup", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: E, password: P, name: N }),
      });
      const res = await response.json();
      localStorage.setItem("uid", res.data.id);
      setSignedIn(true);
      return "success";
    } catch (error) {
      const newErr = getError(error);
      return newErr;
    }
  };

  // function to handle SignIn, if user credentials are correct -> it will be signed it , else not.
  const signIn = async (e, p) => {
    try {
      const response = await fetch("http://localhost:4100/api/user/signin", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: p, email: e }),
      });
      const res = await response.json();
      // console.log(res);
      localStorage.setItem("uid", res.data.userid);
      setSignedIn(res.data.userid);
      return "success";
    } catch (error) {
      const newErr = getError(error);
      return newErr;
    }
  };

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      setSignedIn(uid);
    }
  }, []);

  return (
    <authContext.Provider
      value={{
        SignedIn,
        setSignedIn,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

//custom hook
function useValue() {
  const data = useContext(authContext);
  return data;
}

export { useValue };
export default Authentication;
