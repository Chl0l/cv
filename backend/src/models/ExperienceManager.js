const db = require("./index");

const findAllExperience = () => {
  return db.query(`select * from  experience`);
};

const findOneExperience = (id) => {
  return db.query(`select * from experience where id = ?`, [id]);
};

// const findUserExperience = (iduser) => {
//   return db.query(`SELECT * from experience where id_user = ?`, [iduser]);
// };

const createExperience = (experience) => {
  return db.query(
    `insert into experience (id_user, enterprise, localisation, jobTitle, startDate, endDate) values ((select id from user where id = ?), ?, ?, ?, ?, ?)`,
    [
      experience.id_user,
      experience.enterprise,
      experience.localisation,
      experience.jobTitle,
      experience.startDate,
      experience.endDate,
    ]
  );
};

const updateExperience = (experience) => {
  return db.query(
    `update experience set id_user = ?, enterprise = ?, localisation = ?, jobTitle = ?, startDate = ?, endDate = ? where id = ?`,
    [
      experience.id_user,
      experience.enterprise,
      experience.localisation,
      experience.jobTitle,
      experience.startDate,
      experience.endDate,
      experience.id,
    ]
  );
};

const deleteExperience = (id) => {
  return db.query(`delete from experience where id = ?`, [id]);
};

module.exports = {
  findAllExperience,
  updateExperience,
  deleteExperience,
  createExperience,
  // findUserExperience,
  findOneExperience,
};
