const db = require("../infra/db/mysql-connector");

const findAllDevicesRepository = async () => {
  return await db.query(`SELECT * FROM Devices`);
};

const findDeviceByIdRepository = async (id) => {
  return await db.query(`SELECT * FROM Devices WHERE id='${id}'`);
};

const createDeviceRepository = async (device) => {
  return await db.query(
    `INSERT INTO Devices (name, description, state, type) VALUES ('${device.name}', '${device.description}', '${device.state}', '${device.type}')`
  );
};

const updateDeviceRepository = async (device) => {
  return await db.query(
    `UPDATE Devices SET name='${device.name}', description='${device.description}', state='${device.state}', type='${device.type}' WHERE id='${device.id}'`
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
