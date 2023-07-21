const experienceManager = require("../models/ExperienceManager");

const getExperience = (req, res) => {
  experienceManager
    .findAllExperience()
    .then((taste) => {
      res.json(taste[0]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getOneExperience = (req, res) => {
  experienceManager
    .findOneExperience(req.params.id)
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

// const getUserExperience = (req, res) => {
//   const { iduser, idworkshop } = req.params;
//   experienceManager
//     .findUserExperience(iduser, idworkshop)
//     .then(([rows]) => {
//       if (rows[0] == null) {
//         res.sendStatus(404);
//       } else {
//         res.send(rows);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

const postExperience = (req, res) => {
  const addExperience = req.body;
  experienceManager
    .createExperience(addExperience)
    .then((taste) => {
      if (taste.affectedRows === 0) {
        res.status(404).json("error");
      } else {
        res.status(201).json("Nouvelle expérience ajoutée");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteExperience = (req, res) => {
  experienceManager
    .deleteExperience(req.params.id)
    .then((taste) => {
      if (taste.affectedRows === 0) {
        res.status(404).json("error");
      } else {
        res.status(201).json("Expérience supprimée");
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

const putExperience = (req, res) => {
  const experiences = req.body;

  experiences.id = parseInt(req.params.id, 10);

  experienceManager
    .updateExperience(experiences)
    .then((experience) => {
      if (experience.affectedRows === 0) {
        res.status(404).json("error");
      } else {
        res.status(201).json({ infoExp: experiences });
        // res.status(201).json("Expérience mise à jour");
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  getExperience,
  postExperience,
  deleteExperience,
  putExperience,
  // getUserExperience,
  getOneExperience,
};
