import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginSignUp from "./containers/auth/LoginSignUp";
import UserProfile from "./containers/UserProfile";
import Home from "./containers/Home";
import Layout from "./containers/Layout";
import { useSelector } from "react-redux";
function App() {
  const { access_token } = useSelector(state => state.auth)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={!access_token ? <LoginSignUp /> : <Navigate to="/dashboard" />} />
          </Route>
          <Route path="/dashboard" element={access_token ? <UserProfile /> : <Navigate to="/login" />} />
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;