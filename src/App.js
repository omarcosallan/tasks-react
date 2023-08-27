import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./Pages/Login/Login";
import { Home } from "./Pages/Home/Home";
import { Header } from "./components/Header";
import { useAuthValue } from "./context/AuthContext";
import { useAuthentication } from "./hooks/useAuthentication";

function App() {
  const { user } = useAuthValue();
  const { loading } = useAuthentication();

  if (loading) {
    return (
      <div className="App container">
        <p>Carregando</p>
      </div>
    );
  }

  return (
    <div className="App container">
      <BrowserRouter>
        {user && <Header />}
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
