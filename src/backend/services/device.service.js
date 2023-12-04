const {
  findAllDevicesRepository,
  findDeviceByIdRepository,
  createDeviceRepository,
  updateDeviceRepository,
  deleteDeviceRepository,
} = require("../repositories/device.repository");

const findAllDevicesService = async () => {
  return await findAllDevicesRepository();
};

const findDeviceByIdService = async (id) => {
  const foundDevice = await findDeviceByIdRepository(id);

  if (!foundDevice || foundDevice.length === 0) {
    throw new Error(`Device with id ${id} not found`);
  }

  return foundDevice[0];
};

const createDeviceService = async (name, description, state, type) => {
  if (
    !name ||
    !description ||
    state === null ||
    state === undefined ||
    type === null ||
    type === undefined ||
    (state != 1 && state != 0)
  ) {
    throw new Error(`Bad request`);
  }
  return await createDeviceRepository({ name, description, state, type });
};

const updateDeviceService = async (id, name, description) => {
  const device = await findDeviceByIdService(id);

  if (!device) {
    throw new Error(`Device with ID ${id} not found`);
  }

  if (!name || !description) {
    throw new Error(`Bad request`);
  }

  return await updateDeviceRepository({ ...device, name, description });
};

const updateDeviceStatusService = async (id) => {
  const device = await findDeviceByIdService(id);

  if (!device) {
    throw new Error(`Device with ID ${id} not found`);
  }
  const state = device.state === 1 ? 0 : 1;

  return await updateDeviceRepository({ ...device, state });
};

const deleteDeviceService = async (id) => {
  const device = await findDeviceByIdService(id);

  if (!device) {
    throw new Error(`Device with ID ${id} not found`);
  }

  return await deleteDeviceRepository(id);
};

module.exports = {
  findAllDevicesService,
  findDeviceByIdService,
  createDeviceService,
  updateDeviceService,
  deleteDeviceService,
  updateDeviceStatusService,
};
