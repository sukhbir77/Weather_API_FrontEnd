import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Weather from "./weather";

function Homepage() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      {user ? <Weather /> : <h2 style={{textAlign: "center", marginTop: 100}}>Please Login/Register To Access the API </h2>}
    </>
  );
}

export default Homepage;
