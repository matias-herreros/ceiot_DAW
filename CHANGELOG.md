# DAW Base App - Changes Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## 2.3.0

- Project modification
  - Implements dotenv to read environment variables
  - Adds backend environment variables to docker-compose.yml
  - Reestructures backend to follow a controller-service-repository arquitecture
  - Adds backend logger
  - Adds endpoints to create, edit, edit state, get, get by id, and delete devices.
  - Adds functionality to automatically load the device list
  - Adds functionality to create new devices
  - Adds functionality to edit devices
  - Adds functionality to edit devices' state
  - Adds functionality to delete devices
  - Adds multiple data validators
  - Created a new node image that includes dotenv and log4js libraries

## 2.2.0

- Project modification
  - Adds TypeScript compiler service to Docker Compose
  - Reestructures frontend folder for TypeScript
  - Adds new info to README accordingly
  - Changes project architecture image

## 2.1.0

- Project modification
  - Enhaces README accordingly to Goto IoT
  - Adds example of finished application
  - Removes unnecessary frontend images
  - Changes src code folders names

## 2.0.0

- Project modification
  - Changes project and organization names
  - Removes Typescript container
  - Removes Typescript Code
  - Executes Javascript code directly
  - Changes licence to MIT
  - Modifies README accordingly

## 1.0.0

- Project creation
  - Docker Compose implementation for whole project.
  - Typescript compilation into docker-compose.
  - MySQL 5.7 DB Server.
  - PHPMyAdmin.
  - NodeJS backend application.
  - Materialize CSS framework.
