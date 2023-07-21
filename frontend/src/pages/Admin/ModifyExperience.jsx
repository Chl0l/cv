import { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTask } from "../../contexts/TaskContext";
import { useUser } from "../../contexts/UserContext";

function ModifyExperience() {
  const { id } = useParams();
  const { loggedInUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [experience, setExperience] = useState({
    id: `${id}`,
    id_user: `${loggedInUser.id}`,
    enterprise: "",
    localisation: "",
    jobTitle: "",
    startDate: "",
    endDate: "",
  });
  const { tasks, setTasks } = useTask();
  const [refresh, setRefresh] = useState(false);
  const [newTask, setNewTask] = useState({
    id_experience: `${id}`,
    taskDesk: "",
  });
  const [modifyTask, setModifyTask] = useState({
    id: "",
    id_experience: `${id}`,
    taskDesk: "",
  });
  const navigate = useNavigate();

  const APIGETEX = `${import.meta.env.VITE_BACKEND_URL}/experience/${id}`;
  const APICREATETASKS = `${import.meta.env.VITE_BACKEND_URL}/task`;
  const APIMODIFEXP = `${import.meta.env.VITE_BACKEND_URL}/experience/${id}`;

  const formatDate = (date) => {
    const dateJS = new Date(date);
    const year = dateJS.getFullYear();
    const month = String(dateJS.getMonth() + 1).padStart(2, "0");
    const day = String(dateJS.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Récupération des données de l'expérience

  useEffect(() => {
    const fetchExperienceDetails = async () => {
      try {
        const res = await axios.get(APIGETEX);
        setIsLoading(false);
        /**
         * res.data = [{...}], hors, je souhaite l'objet
         * Donc, je desctucture res.data
         * [info] = res.data === info = res.data[0];
         */
        const [info] = res.data;
        setExperience(info);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExperienceDetails();
  }, [id]);

  // Récupération des tâches des expériences

  const fetchTasks = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/task`)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

  // Supprimer une tâche

  const handleDelete = async (taskId) => {
    const APIDELTASK = `${import.meta.env.VITE_BACKEND_URL}/task/${taskId}`;
    try {
      await axios.delete(APIDELTASK);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  // Ajouter une tâche

  const handleChangeNewTask = (e) => {
    e.preventDefault();
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmitNewTask = async (e) => {
    e.preventDefault();
    await axios
      .post(APICREATETASKS, { ...newTask })
      .then(() => fetchTasks())
      .catch((err) => console.error(err.response.data.message));
    setRefresh(!refresh);
  };

  // Modifier une tâche

  const handleEditTask = (task) => {
    setModifyTask({
      id: task.id,
      id_experience: task.id_experience,
      taskDesc: task.taskDesc,
    });
  };

  const handleChangeModifTask = (e) => {
    setModifyTask({ ...modifyTask, taskDesc: e.target.value });
  };

  const handleSubmitModifTask = (e) => {
    e.preventDefault();
    const taskId = modifyTask.id;
    const APITASKMODIF = `${import.meta.env.VITE_BACKEND_URL}/task/${taskId}`;

    axios
      .put(
        APITASKMODIF,
        { taskDesk: modifyTask.taskDesc },
        { withCredentials: true }
      )
      .then(() => {
        const updatedTasks = tasks.map((task) =>
          task.id === taskId
            ? { ...task, taskDesc: modifyTask.taskDesc, key: task.id }
            : task
        );

        setTasks(updatedTasks);
        navigate("/admin/experiences");
      })
      .catch((err) => console.error(err.response.data.message));
  };

  // Modifier une expérience

  const handleChangeModifExp = (e) => {
    setExperience({ ...experience, [e.target.name]: e.target.value });
  };

  const handleUpdate = (infoExp) => {
    setExperience({
      id: infoExp.id,
      id_user: infoExp.id_user,
      enterprise: infoExp.enterprise,
      localisation: infoExp.localisation,
      jobTitle: infoExp.jobTitle,
      startDate: infoExp.startDate,
      endDate: infoExp.endDate,
    });
  };

  const handleSubmitModifExp = (e) => {
    e.preventDefault();

    const sendExp = {
      ...experience,
      startDate: formatDate(experience.startDate),
      endDate: formatDate(experience.endDate),
    };

    axios
      .put(APIMODIFEXP, { ...sendExp }, { withCredentials: true })
      .then((res) => {
        handleUpdate({ ...res.data.infoExp });
      })
      .catch((err) => console.error(err.response.data.message));
  };

  if (isLoading) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-10">
        <h2 className="text-xl text-center">Modifier une expérience</h2>
        <span className="w-[5rem] bg-primary h-[1px] self-center m-6 md:w-56" />

        <form
          className="flex flex-col gap-6 max-w-md"
          onSubmit={handleSubmitModifExp}
        >
          <div className="flex flex-col gap-5 md:flex md:flex-row md:justify-between">
            <label htmlFor="enterprise">Nom de l'entreprise :</label>
            <input
              type="text"
              name="enterprise"
              id="enterprise"
              className="p-1 rounded text-center eInput md:w-56"
              defaultValue={experience ? experience.enterprise : ""}
              onChange={handleChangeModifExp}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex md:flex-row md:justify-between">
            <label htmlFor="localisation">Localisation :</label>
            <input
              type="text"
              name="localisation"
              id="localisation"
              className="p-1 rounded text-center eInput md:w-56"
              defaultValue={experience.localisation}
              onChange={handleChangeModifExp}
            />
          </div>
          <div className="flex flex-col justify-between gap-5 md:flex md:flex-row md:justify-between">
            <label htmlFor="jobTitle">Intitulé du poste :</label>
            <input
              type="text"
              name="jobTitle"
              id="jobTitle"
              className="p-1 rounded text-center eInput md:w-56"
              defaultValue={experience.jobTitle}
              onChange={handleChangeModifExp}
            />
          </div>
          <div className="flex flex-col justify-between gap-5 md:flex md:flex-row md:justify-between">
            <label htmlFor="startDate">Dates de début :</label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              className="p-1 rounded text-center eInput md:w-56"
              defaultValue={formatDate(experience.startDate)}
              onChange={handleChangeModifExp}
            />
          </div>
          <div className="flex flex-col justify-between gap-5 md:flex md:flex-row md:justify-between">
            <label htmlFor="endDate">Dates de fin :</label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              className="p-1 rounded text-center eInput md:w-56"
              defaultValue={formatDate(experience.endDate)}
              onChange={handleChangeModifExp}
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

      <div className="flex flex-col pb-10 items-center">
        <h2 className="text-xl text-center min-[450px]:mx-[3rem]">
          Ajouter et modifier les tâches de l'expérience
        </h2>
        <span className="w-[5rem] bg-primary h-[1px] self-center m-6 md:w-56" />

        <form
          className="flex flex-col gap-6 min-[550px]:ml-[3rem] min-[550px]:mr-[3rem] xl:w-[446.2px] items-center"
          onSubmit={handleSubmitNewTask}
        >
          <div className="flex items-center justify-center flex-wrap min-[400px]:mx-[3rem]">
            <div className="flex flex-col gap-5 md:flex md:flex-row md:justify-between items-center">
              <label htmlFor="desc">Ajouter une tâche :</label>
              <div className="flex flex-row items-center gap-3 md:w-56">
                <input
                  className="p-1 rounded eInput w-full"
                  type="text"
                  name="taskDesc"
                  onChange={handleChangeNewTask}
                />
                <button className="btmex1" type="submit">
                  <img
                    className="w-6 h-6"
                    src="/assets/adminBtn/add_1.svg"
                    alt="ajouter"
                  />
                </button>
              </div>
            </div>
          </div>
        </form>

        <form
          className="flex flex-col gap-6 min-[550px]:ml-[3rem] min-[550px]:mr-[3rem] xl:w-[446.2px] items-center"
          onSubmit={handleSubmitModifTask}
        >
          <div className="flex flex-col gap-5 md:flex md:flex-row md:justify-between items-center">
            <label htmlFor="taskDesc">Tâches :</label>
            <div className="flex flex-col md:justify-between gap-2">
              {tasks
                .filter((task) => Number(task.id_experience) === Number(id))
                .map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-row items-center gap-3"
                  >
                    <textarea
                      name="taskDesc"
                      id="taskDesc"
                      className="p-1 rounded eInput w-full"
                      value={
                        modifyTask.id === task.id
                          ? modifyTask.taskDesc
                          : task.taskDesc
                      }
                      onChange={handleChangeModifTask}
                      readOnly={modifyTask.id !== task.id}
                      data-task-id={task.id}
                    />
                    {modifyTask.id === task.id ? (
                      <button
                        type="submit"
                        className="btnAd1"
                        data-action="validate"
                      >
                        Valider
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btnAd1"
                        onClick={() => handleEditTask(task)}
                      >
                        Modifier
                      </button>
                    )}
                    <button
                      type="button"
                      className="btnAd1"
                      onClick={() => handleDelete(task.id)}
                    >
                      <img
                        src="/assets/adminBtn/delete_2.svg"
                        alt="delete button"
                        className="w-[2rem] h-[2rem]"
                      />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </form>
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
      </div>
    </div>
  );
}

export default ModifyExperience;
