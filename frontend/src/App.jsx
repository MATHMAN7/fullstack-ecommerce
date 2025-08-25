import { useEffect, useState } from "react";

function App() {
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {

    fetch("http://localhost:5000/")
        .then(res => res.json())
        .then(data => setBackendMessage(data.message))
        .catch(err => console.error(err));
  }, []);

  return (
      <div>
        <h1>Frontend + Backend Test</h1>
        <p>{backendMessage}</p>
      </div>
  );
}

export default App;