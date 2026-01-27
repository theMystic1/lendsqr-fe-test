import { Link } from "react-router-dom";
import { IMgs } from "../../constants/constant";
import { Logo } from "../dashboard/navBar";
import CustomBtn from "../ui/button";
import { Column, Input, Row } from "../ui/filterDrop";

const LoginPage = () => {
  return (
    <div className="grid-2 grid login">
      <Column className="p-10 items-start mt-8 gap-20">
        <Logo />

        <Column className="items-start">
          <img src={IMgs.pablo} />
        </Column>
      </Column>

      <Column className="login__login items- justify-center w-full p-12 gap-12">
        <Column className="items-start">
          <h1>Welcome!</h1>

          <p>Enter details to login.</p>
        </Column>

        <Column className="gap-8">
          <Input
            label=""
            placeholder="Email"
            value=""
            type="email"
            onChange={() => {}}
          />
          <Input
            label=""
            placeholder="Password"
            value=""
            type="password"
            onChange={() => {}}
          />

          <Row className="justify-start">
            <Link to={"#"} className="forgotLink">
              Forgot PASSWORD?
            </Link>
          </Row>
        </Column>
        <CustomBtn>Login</CustomBtn>
      </Column>
    </div>
  );
};

export default LoginPage;
