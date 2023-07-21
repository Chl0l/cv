import { createContext, useContext, useState, useMemo, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const ExperienceContext = createContext();

export function ExperienceProvider({ children }) {
  const [experiences, setExperiences] = useState([]);

  const fetchExperiences = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/experience`)
      .then((res) => {
        setExperiences(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const propsPassing = useMemo(
    () => ({
      experiences,
      fetchExperiences,
    }),
    [experiences, fetchExperiences]
  );

  return (
    <ExperienceContext.Provider value={propsPassing}>
      {children}
    </ExperienceContext.Provider>
  );
}

ExperienceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useExperience = () => useContext(ExperienceContext);
