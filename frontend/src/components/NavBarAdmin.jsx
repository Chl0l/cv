import { NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function NavBarAdmin() {
  const { handleClickLogOut } = useUser();

  return (
    <div className="navBar md:navBarMd">
      <NavLink to="/admin">
        <h1 className="navBarH1 md:navBarH1Md 2xl:navBarH12xl">Chloé Elle</h1>
      </NavLink>
      <h2 className="navBarH2 md:navBarH2Md">Développeuse web Fullstack</h2>

      <ul className="menu md:menumd 2xl:menu2xl">
        <NavLink to="/admin/experiences">
          <li>Expériences</li>
        </NavLink>
        <NavLink to="/admin/formations">
          <li>Formations</li>
        </NavLink>
        <NavLink to="/admin/competences">
          <li>Compétences</li>
        </NavLink>
        <NavLink to="/admin/projets">
          <li>Projets</li>
        </NavLink>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <button
          type="button"
          onClick={handleClickLogOut}
          className="w-[54px] text-center boutonDecoOff"
        >
          <img
            src="/assets/logout/logoutblack.svg"
            alt="Bouton de déconnexion"
            className="w-[30px]"
          />
        </button>
      </ul>
    </div>
  );
}

export default NavBarAdmin;
