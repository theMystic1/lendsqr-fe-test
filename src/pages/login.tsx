import { useNavigate } from "react-router-dom";
import LoginPage from "../components/auth/loginPage";
import { useEffect } from "react";
import { getToken } from "../utils/helpers";

const Login = () => {
  const token = getToken();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return <LoginPage />;
};

export default Login;
