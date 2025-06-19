# Contact Form Web Application

A Node.js-based contact form web application, containerized for easy deployment. Uses MongoDB for data storage.

---

## Quick Jump

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
  - [Run with Docker](#run-with-docker)
  - [Run with Docker Compose](#run-with-docker-compose)
- [Configuration](#configuration)
- [Ports](#ports)
- [Author](#author)

---

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your system
- (Optional) [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) for local development

---

## Quick Start

### Run with Docker

To quickly start the application and its dependencies using Docker, run the following commands in separate terminals or as background processes:

```sh
# Start MongoDB
docker run -d \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=<username> \
  -e MONGO_INITDB_ROOT_PASSWORD=<password> \
  -e MONGO_INITDB_DATABASE=<database> \
  -p 27017:27017 \
  mongo:4.4

# Start Mongo Express
docker run -d \
  --name mongo-express \
  -e ME_CONFIG_MONGODB_ADMINUSERNAME=<username> \
  -e ME_CONFIG_MONGODB_ADMINPASSWORD=<password> \
  -e ME_CONFIG_MONGODB_URL=mongodb://<username>:<password>@mongodb:27017/<database>?authSource=admin \
  --link mongodb \
  -p 8081:8081 \
  mongo-express

# Start the Contact Form Web Application
docker run -d \
  --name contact-form \
  -p 3000:3000 \
  -e MONGO_URL=mongodb://<username>:<password>@mongodb:27017/<database>?authSource=admin \
  --link mongodb \
  prancodes/contact-form:latest
```

### Run with Docker Compose

1. Create a `docker-compose.yaml` file in your project directory with the following content:

```yaml
services:
  web:
    image: prancodes/contact-form:latest
    ports:
      - 3000:3000
    environment:
      MONGO_URL: mongodb://<username>:<password>@mongodb:27017/<database>?authSource=admin
    depends_on:
      - mongodb
      - mongo-express

  mongodb:
    image: mongo:4.4
    environment:
      MONGO_INITDB_ROOT_USERNAME: <username>
      MONGO_INITDB_ROOT_PASSWORD: <password>
      MONGO_INITDB_DATABASE: <database>
    ports:
      - 27017:27017

  mongo-express:
    image: mongo-express
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: <username>
      ME_CONFIG_MONGODB_ADMINPASSWORD: <password>
      ME_CONFIG_MONGODB_URL: mongodb://<username>:<password>@mongodb:27017/<database>?authSource=admin
    depends_on:
      - mongodb
```

2. Start all services using Docker Compose:

```sh
docker compose up -d
```

This will start the web application, MongoDB, and Mongo Express using the configuration in your `docker-compose.yaml` file and environment variables.

---

## Configuration

- `NODE_ENV` (default: `Production`)
- `MONGO_URL` (required): MongoDB connection string

## Ports

- `localhost:3000`: Application
- `localhost:8081`: Mongo Express

---

## Author

🧑🏻‍💻 Developed and maintained by [Pranjal Singh](https://github.com/prancodes)

