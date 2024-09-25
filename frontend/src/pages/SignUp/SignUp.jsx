import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer} from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate();
    const [ inputValue, setInputValue ] = useState({
        email: "",
        username: "",
        password: ""
    })

    const { email, password, username } = inputValue;

    const handleOnChange = async (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right",
        });

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(
                "http://localhost:4000/signup",
                {
                    ...inputValue,
                },
                { withCredentials: true}
            );
            const { success, message } = data;
            console.log(data);
            if(success){
                handleSuccess(message);
                navigate("/");
            } else{
                handleError(message);
            }
        } catch(error){
            console.log(error);
        }
        setInputValue({
          email : "",
          password : "",
      })
    }

// error instead log
// async for handle Submit
    return (
        <div className="form">
          <h2>Sign up Account</h2>
          <ToastContainer />
          <form onSubmit={handleOnSubmit}>
            <div>
              <h2>Email</h2>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleOnChange}
              />
            </div>
            <div>
              <h2>Username</h2>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Enter your username"
                onChange={handleOnChange}
              />
            </div>
            <div>
              <h2 htmlFor="password">Password</h2>
              <input
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
              />
            </div>
            <button type="submit">Submit</button>
            <span>
              Already have an account? <Link to={"/login"}>Login</Link>
            </span>
          </form>
        </div>
  );
};

export default SignUp;