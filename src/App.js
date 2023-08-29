import "./App.css";

import { Login } from "./Pages/Login/Login";
import { Home } from "./Pages/Home/Home";

import { Header } from "./components/Header";

import { useAuthValue } from "./context/AuthContext";

import { useAuthentication } from "./hooks/useAuthentication";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard/Dashboard";

function App() {
  const { user } = useAuthValue();
  const { loading } = useAuthentication();

  if (loading) {
    return (
      <div className="App container">
        <p className="loading">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="App container">
      <BrowserRouter>
        {user && <Header />}
        <Routes>
          <Route
            path="/:filter?"
            element={user ? <Home /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
