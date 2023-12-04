const express = require("express");
const { Router } = express;
const {
  findAllDevicesService,
  findDeviceByIdService,
  createDeviceService,
  updateDeviceService,
  deleteDeviceService,
  updateDeviceStatusService,
} = require("../services/device.service");
const { logger } = require("../utils/logger.js");

const deviceRouter = Router();

deviceRouter.get("/all", async (req, res) => {
  try {
    const devices = await findAllDevicesService();
    logger.info(`${req.method} ${req.baseUrl}${req.path}`);
    res.status(200).send(devices);
  } catch (error) {
    logger.error(error);
    res.status(400).send(error.message);
  }
});

deviceRouter.get("/:id", async (req, res) => {
  try {
    const device = await findDeviceByIdService(req.params.id);
    logger.info(`${req.method} ${req.baseUrl}${req.path}`);
    res.status(200).send(device);
  } catch (error) {
    logger.error(error);
    res.status(400).send(error.message);
  }
});

deviceRouter.post("/", async (req, res) => {
  try {
    const device = await createDeviceService(
      req.body.name,
      req.body.description,
      req.body.state,
      req.body.type
    );
    logger.info(`${req.method} ${req.baseUrl}${req.path}`);
    res.status(201).send(device);
  } catch (error) {
    logger.error(error);
    res.status(400).send(error.message);
  }
});

deviceRouter.put("/:id/state", async (req, res) => {
  try {
    const device = await updateDeviceStatusService(req.params.id);
    logger.info(`${req.method} ${req.baseUrl}${req.path}`);
    res.status(200).send(device);
  } catch (error) {
    logger.error(error);
    res.status(400).send(error.message);
  }
});

deviceRouter.put("/", async (req, res) => {
  try {
    const device = await updateDeviceService(
      req.body.id,
      req.body.name,
      req.body.description
    );
    logger.info(`${req.method} ${req.baseUrl}${req.path}`);
    res.status(200).send(device);
  } catch (error) {
    logger.error(error);
    res.status(400).send(error.message);
  }
});

deviceRouter.delete("/:id", async (req, res) => {
  try {
    const device = await deleteDeviceService(req.params.id);
    logger.info(`${req.method} ${req.baseUrl}${req.path}`);
    res.status(200).send(device);
  } catch (error) {
    logger.error(error);
    res.status(400).send(error.message);
  }
});

module.exports = deviceRouter;
