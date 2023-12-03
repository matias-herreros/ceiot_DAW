const db = require("../infra/db/mysql-connector");

const findAllDevicesRepository = async () => {
  return await db.query(`SELECT * FROM Devices`);
};

const findDeviceByIdRepository = async (id) => {
  return await db.query(`SELECT * FROM Devices WHERE id='${id}'`);
};

const createDeviceRepository = async (name, description, state, type) => {
  return await db.query(
    `INSERT INTO Devices (name, description, state, type) VALUES ('${name}', '${description}', '${state}', '${type}')`
  );
};

const updateDeviceRepository = async (id, name, description, state, type) => {
  return await db.query(
    `UPDATE Devices SET name='${name}', description='${description}', state='${state}', type='${type}' WHERE id='${id}'`
  );
};

const deleteDeviceRepository = async (id) => {
  return await db.query(`DELETE FROM Devices WHERE id='${id}'`);
};

module.exports = {
  findAllDevicesRepository,
  findDeviceByIdRepository,
  createDeviceRepository,
  updateDeviceRepository,
  deleteDeviceRepository,
};
