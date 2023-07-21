import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const TaskContext = createContext([]);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const propsPassing = useMemo(
    () => ({
      tasks,
      setTasks,
    }),
    [tasks, setTasks]
  );

  return (
    <TaskContext.Provider value={propsPassing}>{children}</TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTask = () => useContext(TaskContext);
