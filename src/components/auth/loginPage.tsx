import { Link, useNavigate } from "react-router-dom";
import { IMgs } from "../../constants/constant";
import { Logo } from "../dashboard/navBar";
import CustomBtn from "../ui/button";
import { Column, Input, Row } from "../ui/filterDrop";
import { useState } from "react";
import toast from "react-hot-toast";
import { login } from "../../server/server";

const LoginPage = () => {
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleValue = (name: "email" | "password", value: string) => {
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleLogin = async () => {
    try {
      const loginItem: any = await login(value.email, value.password);

      localStorage.setItem("ADMIN_TOKEN", loginItem?.token);

      toast.success("Login successful");
      navigate("/");
      console.log(loginItem);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Login failed");
    }
  };
  return (
    <>
      <div className="grid-2 grid login avenir">
        <div className="absolute p-12">
          <Logo />
        </div>
        <Column className=" col-1 items-start justify-center mt-8 gap-20">
          <Column className="items-center justify-center">
            <img src={IMgs.pablo} className="login-img" />
          </Column>
        </Column>

        <Column className="login__login items- justify-center w-full col-2 p-12 gap-12">
          <Column className="items-start">
            <h1>Welcome!</h1>

            <p>Enter details to login.</p>
          </Column>

          <Column className="gap-8">
            <Input
              label=""
              placeholder="Email"
              value={value.email}
              type="email"
              onChange={(e) => handleValue("email", e.target.value)}
              required
            />
            <Input
              label=""
              placeholder="Password"
              value={value.password}
              type={showPwd ? "text" : "password"}
              onChange={(e) => handleValue("password", e.target.value)}
              required
              showPd={showPwd}
              onShowPd={setShowPwd}
            />

            <Row className="justify-start">
              <Link to={"#"} className="forgotLink">
                Forgot PASSWORD?
              </Link>
            </Row>
          </Column>
          <CustomBtn onClick={handleLogin}>Login</CustomBtn>
        </Column>
      </div>{" "}
    </>
  );
};

export default LoginPage;
