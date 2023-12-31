import PropTypes from "prop-types";
import { createContext, useContext, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function UserProvider({ children }) {
  const APILOGIN = `${import.meta.env.VITE_BACKEND_URL}/login`;
  const APILOGOUT = `${import.meta.env.VITE_BACKEND_URL}/logout`;
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState({
    id: "",
    lastname: "",
    firstname: "",
    email: "",
  });

  const [user, setUser] = useState({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmitLogIn = (e) => {
    e.preventDefault();
    axios
      .post(APILOGIN, { ...user }, { withCredentials: true })
      .then((res) => {
        setLoggedInUser({
          id: res.data.user.id,
          lastname: res.data.user.lastname,
          firstname: res.data.user.firstname,
          email: res.data.user.email,
        });
        navigate("/admin/experiences");
      })
      .catch((err) => console.error(err.response.data.message));
  };

  const handleClickLogOut = () => {
    axios
      .get(APILOGOUT, { withCredentials: true })
      .then((res) => {
        console.warn(res.data.message);
        setLoggedInUser({
          id: "",
          lastname: "",
          firstname: "",
          email: "",
        });
        navigate("/");
      })
      .catch((err) => console.error(err.response.data.message));
  };

  const propsPassing = useMemo(
    () => ({
      loggedInUser,
      handleSubmitLogIn,
      handleChange,
      handleClickLogOut,
    }),
    [loggedInUser, handleSubmitLogIn, handleChange, handleClickLogOut]
  );

  return (
    <UserContext.Provider value={propsPassing}>{children}</UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
export { UserContext };

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
