const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const { newUser, recognizeUser } = require("./middlewares/userMiddlewares");
const {
  hashPassword,
  verifyPassword,
} = require("./controllers/authControllers");
const experienceControllers = require("./controllers/experienceControllers");
const taskControllers = require("./controllers/taskControllers");
const {
  foreignKeyOFF,
  foreignKeyON,
} = require("./middlewares/ForeignKeyMiddleware");

// Gestion login/logout des utilisateurs (admin et user)

router.post("/login", recognizeUser, verifyPassword);
router.get("/logout", userControllers.logout);

// Gestion utilisateurs

router.post("/inscription", newUser, hashPassword, userControllers.postUser);
router.get("/users", userControllers.getAllUser);
router.get("/users/:id", userControllers.getOneUser);
router.put("/users/:id", hashPassword, userControllers.putOneUser);
router.delete("/users/:id", userControllers.deleteOneUser);

// Gestion des expériences

router.get("/experience", experienceControllers.getExperience);
router.get("/experience/:id", experienceControllers.getOneExperience);
// router.get(
//   "/experience/:iduser",
//   experienceControllers.getUserExperience
// );
router.post("/experience", experienceControllers.postExperience);
router.put("/experience/:id", experienceControllers.putExperience);
router.delete(
  "/experience/:id",
  foreignKeyOFF,
  experienceControllers.deleteExperience,
  foreignKeyON
);

// Gestion des tâches

router.get("/task", taskControllers.getTask);
router.get("/task/:id", taskControllers.getOneTask);
router.get("/:idexperience/task", taskControllers.getExperienceTasks);
router.post("/task", taskControllers.postTask);
router.put("/task/:id", taskControllers.putTask);
router.delete("/task/:id", taskControllers.deleteTask);

module.exports = router;
