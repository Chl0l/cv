const db = require("./index");

const findAllTask = () => {
  return db.query(`select * from  task`);
};

const findOneTask = (id) => {
  return db.query(`select * from task where id = ?`, [id]);
};

const findExperienceTasks = (idexperience) => {
  return db.query(`SELECT * from task where id_experience = ?`, [idexperience]);
};

const createTask = (task) => {
  return db.query(
    `insert into task (id_experience, taskDesc) values ((select id from experience where id = ?), ?)`,
    [task.id_experience, task.taskDesc]
  );
};

const updateTask = (task) => {
  return db.query(
    `update task set id_experience = ?, taskDesc = ? where id = ?`,
    [task.id_experience, task.taskDesc, task.id]
  );
};

const deleteTask = (id) => {
  return db.query(`delete from task where id = ?`, [id]);
};

module.exports = {
  findAllTask,
  updateTask,
  deleteTask,
  createTask,
  findExperienceTasks,
  findOneTask,
};
