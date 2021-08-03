let knex = require('../../../db/pg/knex');

let listData = () => {
  return knex.raw(`SELECT * FROM students;`).then(data => data.rows);
}

let findData = (prop, val) => {
  return knex.raw(`
    SELECT * FROM students WHERE ${prop}= '${val}'
  `)
  .then(data => data.rows[0]);
}

let findDataBy = (prop, val) => {
  return knex.raw(`
    SELECT * FROM students WHERE ${prop}= '${val}'
  `)
  .then(data => data.rows);
}

let addData = (studentInfo) => {
  return knex('students').insert(studentInfo).returning('*')
  .then(result => result[0]);
}

let deleteData = (id) => {
  return knex('students')
    .where('id', id)
    .del()
    .then(resp => {
      if(resp == 1) {
        return {
          id,
          status: 'success'
        }
      }
      return {
        status: 'fail'
      }
    });
}

let dropAll = () => {
  return knex.raw(`
    DELETE FROM students;
    ALTER SEQUENCE students_id_seq RESTART WITH 1;
  `);
}

module.exports = {
  listData,
  findData,
  findDataBy,
  addData,
  deleteData,
  dropAll
};