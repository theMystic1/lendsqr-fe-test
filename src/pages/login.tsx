import { useNavigate } from "react-router-dom";
import LoginPage from "../components/auth/loginPage";
import { useEffect } from "react";

const Login = () => {
  const token = localStorage.getItem("ADMIN_TOKEN");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return <LoginPage />;
};

export default Login;
