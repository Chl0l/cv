import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useTask } from "../contexts/TaskContext";

function ExperienceBubble({
  enterprise,
  localisation,
  jobTitle,
  startDate,
  endDate,
  id,
  idexperience,
}) {
  const [visible, setVisible] = useState(false);
  const { tasks, setTasks } = useTask();
  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit" };
    return new Date(date).toLocaleDateString("fr-FR", options);
  };
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  function handleClick() {
    setVisible(!visible);
  }

  const isOddBubble = (id - 1) % 2 === 0;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/task`)
      .then((res) => {
        console.warn(res.data);
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
        <button type="button" className="btn5 md:btn5Md" onClick={handleClick}>
          <h3>{enterprise}</h3>
          <p>{localisation}</p>
          <p>{jobTitle}</p>
        </button>
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

ExperienceBubble.defaultProps = {
  enterprise: "",
  localisation: "",
  jobTitle: "",
  startDate: null,
  endDate: null,
};

ExperienceBubble.propTypes = {
  enterprise: PropTypes.string,
  localisation: PropTypes.string,
  jobTitle: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  id: PropTypes.number.isRequired,
  idexperience: PropTypes.number.isRequired,
};

export default ExperienceBubble;
