const taskManager = require("../models/TaskManager");

const getTask = (req, res) => {
  taskManager
    .findAllTask()
    .then((taste) => {
      res.json(taste[0]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getOneTask = (req, res) => {
  taskManager
    .findOneTask(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getExperienceTasks = (req, res) => {
  const { idexperience } = req.params;
  taskManager
    .findExperienceTasks(idexperience)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postTask = (req, res) => {
  const addTask = req.body;
  taskManager
    .createTask(addTask)
    .then((taste) => {
      if (taste.affectedRows === 0) {
        res.status(404).json("error");
      } else {
        res.status(201).json("Nouvelle tâche ajoutée");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteTask = (req, res) => {
  taskManager
    .deleteTask(req.params.id)
    .then((taste) => {
      if (taste.affectedRows === 0) {
        res.status(404).json("error");
      } else {
        res.status(201).json("Tâche supprimée");
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

const putTask = (req, res) => {
  const tasted = req.body;
  tasted.id = parseInt(req.params.id, 10);
  taskManager
    .updateTask(tasted)
    .then((taste) => {
      if (taste.affectedRows === 0) {
        res.status(404).json("error");
      } else {
        res.status(201).json("Tâche mise à jour");
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  getTask,
  postTask,
  deleteTask,
  putTask,
  getExperienceTasks,
  getOneTask,
};
