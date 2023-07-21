import { NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function NavBar() {
  const { loggedInUser } = useUser();

  return (
    <div className="navBar md:navBarMd">
      <NavLink to="/">
        <h1 className="navBarH1 md:navBarH1Md 2xl:navBarH12xl">Chloé Elle</h1>
      </NavLink>
      <h2 className="navBarH2 md:navBarH2Md">Développeuse web Fullstack</h2>

      <ul className="menu md:menumd 2xl:menu2xl">
        <NavLink to="/experiences">
          <li>Parcours</li>
        </NavLink>
        <NavLink to="/formations">
          <li>Formations</li>
        </NavLink>
        <NavLink to="/competences">
          <li>Compétences</li>
        </NavLink>
        <NavLink to="/projets">
          <li>Projets</li>
        </NavLink>
        <NavLink
          to="/admin/experiences"
          className={`${loggedInUser.id ? "visible" : "hidden"}`}
        >
          <li>Admin</li>
        </NavLink>
      </ul>
    </div>
  );
}

export default NavBar;
