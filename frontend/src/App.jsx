import { useEffect, useState } from "react";
import Register from "./pages/Register";
import "./App.css"
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";


function App() {
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {

    fetch("http://localhost:5000/")
        .then(res => res.json())
        .then(data => setBackendMessage(data.message))
        .catch(err => console.error(err));
  }, []);

  return (
      <div className="container">

          <RegisterPage/>
      </div>
  );
}

export default App;