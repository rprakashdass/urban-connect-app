import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        // Properly log cookies as an object
        console.log("Cookies: ", cookies);

        // Access and print the specific token if available
        console.log("Token: ", cookies.token);

        if (!cookies.token) {
          console.log("!cookies.token")
          navigate("/login");
          return;
        }

        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;

        if (status) {
          setUsername(user);
          navigate("/");
          toast.success(`Hello ${user}`, {
            position: "top-right",
          });
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying cookie:", error);
        removeCookie("token");
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  return (
    <>
      <div className="home_page">
        <h4>
          Welcome, <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;