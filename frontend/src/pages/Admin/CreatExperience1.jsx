import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../contexts/UserContext";
import { useExperience } from "../../contexts/ExperienceContext";

function CreatExperience1() {
  const { loggedInUser } = useUser();
  const { fetchExperiences } = useExperience();
  const navigate = useNavigate();
  const [experience, setExperience] = useState({
    id: "",
    id_user: `${loggedInUser.id}`,
    enterprise: "",
    localisation: "",
    jobTitle: "",
    startDate: "",
    endDate: "",
  });
  const APICREATEEXP = `${import.meta.env.VITE_BACKEND_URL}/experience`;

  const handleChangeCreateExp = (e) => {
    const { name, value } = e.target;
    setExperience((prevExperience) => ({
      ...prevExperience,
      [name]: value,
    }));
  };

  const handleSubmitCreateExp = (e) => {
    e.preventDefault();
    const startDate = experience.startDate || null;
    const endDate = experience.endDate || null;

    const experienceWithIdUser = {
      ...experience,
      id_user: loggedInUser.id,
      startDate,
      endDate,
    };

    axios
      .post(APICREATEEXP, experienceWithIdUser, { withCredentials: true })
      .then((res) => {
        console.warn(res.data.message);
        navigate(`/admin/experiences`);
        fetchExperiences();
      })
      .catch((err) => console.error(err.response.data.message));
  };

  return (
    <div>
      <div className="flex flex-col p-10 md:items-center">
        <h2 className="text-xl text-center">Ajouter une expérience</h2>
        <span className="w-[5rem] bg-primary h-[1px] self-center m-6 md:w-56" />

        <form
          className=" flex flex-col gap-6 min-[550px]:ml-[3rem] min-[550px]:mr-[3rem]"
          onSubmit={handleSubmitCreateExp}
        >
          <div className="flex flex-col justify-between gap-5 md:flex md:flex-row">
            <label htmlFor="enterprise">Nom de l'entreprise :</label>
            <input
              type="text"
              name="enterprise"
              id="enterprise"
              className="p-1 rounded text-center eInput md:w-56"
              onChange={handleChangeCreateExp}
            />
          </div>
          <div className="flex flex-col justify-between gap-5 md:flex md:flex-row">
            <label htmlFor="localisation">Localisation :</label>
            <input
              type="text"
              name="localisation"
              id="localisation"
              className="p-1 rounded text-center eInput md:w-56"
              onChange={handleChangeCreateExp}
            />
          </div>
          <div className="flex flex-col justify-between gap-5 md:flex md:flex-row">
            <label htmlFor="jobTitle">Intitulé du poste :</label>
            <input
              type="text"
              name="jobTitle"
              id="jobTitle"
              className="p-1 rounded text-center eInput md:w-56"
              onChange={handleChangeCreateExp}
            />
          </div>
          <div className="flex flex-col justify-between gap-5 md:flex md:flex-row">
            <label htmlFor="startDate">Dates :</label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              className="p-1 rounded text-center eInput md:w-56"
              onChange={handleChangeCreateExp}
            />
          </div>
          <div className="flex flex-col justify-between gap-5 md:flex md:flex-row">
            <label htmlFor="endDate">Dates :</label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              className="p-1 rounded text-center eInput md:w-56"
              onChange={handleChangeCreateExp}
            />
          </div>
          <div className="p-8 flex flex-row justify-center flex-wrap">
            <button className="m-2 btnex1 flex" type="submit">
              Valider
            </button>
            <NavLink to="/admin/experiences">
              <button className="m-2 btnex1 flex" type="button">
                Annuler
              </button>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatExperience1;
