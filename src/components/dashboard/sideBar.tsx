import { NavLink, useNavigate } from "react-router-dom";
import { IMgs, logout, sections, switchOrg } from "../../constants/constant";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `side-nav__link flex justify-start items-center ${isActive ? "side-nav__link--active" : ""}`;

const Sidebar = () => {
  return (
    <aside className="side-nav hidden">
      <nav className="side-nav__menu flex flex-col">
        <div className="side-nav__compactment">
          <button className="side-nav__link flex justify-start items-center">
            <img src={switchOrg.icon} alt={`${switchOrg.name} icon`} />
            <span>{switchOrg.name}</span>
            <img src={IMgs.chevronDown} alt={`chevron down icon`} />
          </button>
        </div>

        <NavItems />
      </nav>
    </aside>
  );
};

export default Sidebar;

export const NavItems = () => {
  const navigate = useNavigate();

  return (
    <>
      {sections.map((section) => (
        <div
          className="side-nav__compactment flex flex-col"
          key={section.title ?? "dashboard"}
        >
          {section.title ? <h1>{section.title}</h1> : null}

          {section.items.map((item) => (
            <NavLink
              to={item.routeUrl}
              className={linkClass}
              key={item.routeUrl}
            >
              <img src={item.icon} alt={`${item.name} icon`} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      ))}

      <div className="side-nav__footer flex flex-col">
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          <img src={logout.icon} alt={`${logout.name} icon`} />
          <span>{logout.name}</span>
        </button>

        <p>V1.20</p>
      </div>
    </>
  );
};
