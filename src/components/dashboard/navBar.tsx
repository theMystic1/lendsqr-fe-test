import { Link } from "react-router-dom";
import { IMgs } from "../../constants/constant";
import { NotificationsOutlined, Search } from "@mui/icons-material";
import ArrowDropDownTwoToneIcon from "@mui/icons-material/ArrowDropDownTwoTone";
import { useCustomParams } from "../../hooks/useCustomParam";
import { useState } from "react";
import MobileNavBar from "../ui/mobileNav";

const NavBar = () => {
  const [value, setValue] = useState("");
  const { updateQuery } = useCustomParams();
  return (
    <nav className="nav flex items-center justify-between gap-10">
      <div className="flex items-center justify-between nav__item">
        <Logo />

        <div className="flex items-center relative">
          <div className="input input__min">
            <input
              type="text"
              placeholder="Search for anything"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button
            className="searchBtn flex items-center justify-center absolute"
            onClick={() => updateQuery("search", value)}
          >
            <Search />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-end nav__item nav__itm">
        <MobileNavBar />
        <UserHeader />
      </div>
    </nav>
  );
};

export default NavBar;

const UserHeader = () => {
  return (
    <div className=" hd-bg">
      <p className="underline">Docs</p>

      <NotificationsOutlined />

      <span className="flex items-center gap-2">
        <img src={IMgs.avataricon} alt="User avatar" />

        <p>Adedeji</p>
        <ArrowDropDownTwoToneIcon />
      </span>
    </div>
  );
};

export const Logo = () => {
  return (
    <Link to={"/"} className="logo">
      <img src={IMgs.logo} />
    </Link>
  );
};
