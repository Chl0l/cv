import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { useTask } from "../contexts/TaskContext";
import { useExperience } from "../contexts/ExperienceContext";

function ExperienceBubbleAdmin({
  enterprise,
  localisation,
  jobTitle,
  startDate,
  endDate,
  id,
  idexperience,
  onDelete,
}) {
  const { tasks, setTasks } = useTask();
  const { fetchExperiences } = useExperience();
  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit" };
    return new Date(date).toLocaleDateString("fr-FR", options);
  };

  const [visible, setVisible] = useState(false);
  const isOddBubble = (id - 1) % 2 === 0;
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  function handleClick() {
    setVisible(!visible);
  }

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleDelete = async () => {
    const expId = id;
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/experience/${expId}`
    );
    onDelete();
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/task`)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div
      className={`wrapper md:wrapperMd lg:wrapperLg ${
        visible ? "wrapperActive md:wrapperActiveMd" : null
      }`}
    >
      <div className="wrapperBtn md:wrapperBtnMd">
        <div className="flex flex-col items-center">
          <button
            type="button"
            className="btn5 md:btn5Md"
            onClick={handleClick}
          >
            <h3>{enterprise}</h3>
            <p>{localisation}</p>
            <p>{jobTitle}</p>
          </button>
          <div className="flex">
            <NavLink to={`/admin/modifyexperience/${idexperience}`}>
              <button type="button" className="btnAd1">
                <img src="/assets/adminBtn/modify_2.svg" alt="modify button" />
              </button>
            </NavLink>
            <button
              type="button"
              className="btnAd1 w-[25%]"
              onClick={() => handleDelete()}
            >
              <img src="/assets/adminBtn/delete_2.svg" alt="modify button" />
            </button>
          </div>
        </div>
      </div>
      {visible && (
        <div
          className={`wrapperText md:wrapperTextMd ${
            isOddBubble ? "md:right" : "md:left"
          }`}
        >
          <h3>
            {formattedStartDate} - {formattedEndDate}
          </h3>
          <ul>
            {tasks
              .filter((task) => task.id_experience === idexperience)
              .map((task) => (
                <li key={task.id}>{task.taskDesc}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

ExperienceBubbleAdmin.defaultProps = {
  enterprise: "",
  localisation: "",
  jobTitle: "",
  startDate: null,
  endDate: null,
};

ExperienceBubbleAdmin.propTypes = {
  enterprise: PropTypes.string,
  localisation: PropTypes.string,
  jobTitle: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  id: PropTypes.number.isRequired,
  idexperience: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ExperienceBubbleAdmin;
