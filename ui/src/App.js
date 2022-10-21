import { Routes, Route } from "react-router-dom";
import SignIn from "./components/sign_in";
import SignUp from "./components/sign_up";
import Dashboard from "./components/Dashboard";
import ProtectedRoutes from "./RouterProtection/ProtectedRoutes";
import PublicRoutes from "./RouterProtection/PublicRoutes";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route
          path="*"
          element={
            <div
              style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                fontWeight: "700",
              }}
            >
              Page Not Found ! 404
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;
