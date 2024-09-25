// Styles
import './App.css'

// Authentication and Authorization -
// https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/

import { Route, Routes } from "react-router-dom";
import { LogIn, SignUp, Home } from "./pages";
import LoginForm from './pages/Login/Login';
// import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/login_cards" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;