# Contact Form Web Application

A Node.js-based contact form web application, containerized for easy deployment. Uses MongoDB for data storage.

---

## Quick Start

### Run with Docker

```sh
docker run -d \
  --name contact-form \
  -p 3000:3000 \
  -e NODE_ENV=Production \
  -e MONGO_URL=mongodb://<username>:<password>@<host>:<port>/<database>?authSource=admin \
  prancodes/contact-form:latest
```

### Example: Using Docker Compose

> **Note:** The `docker-compose.yaml` file is not included in this repository. Below is an example you can use.

```yaml
version: '3.8'
services:
  web:
    image: prancodes/contact-form:latest
    ports:
      - 3000:3000
    environment:
      NODE_ENV: Production
      MONGO_URL: mongodb://pranjal:pran2004@mongodb:27017/contact?authSource=admin
    depends_on:
      - mongodb

  mongodb:
    image: mongo:4.4
    environment:
      MONGO_INITDB_ROOT_USERNAME: pranjal
      MONGO_INITDB_ROOT_PASSWORD: pran2004
      MONGO_INITDB_DATABASE: contact
    ports:
      - 27017:27017

  mongo-express:
    image: mongo-express
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: pranjal
      ME_CONFIG_MONGODB_ADMINPASSWORD: pran2004
      ME_CONFIG_MONGODB_URL: mongodb://pranjal:pran2004@mongodb:27017/contact?authSource=admin
    depends_on:
      - mongodb
```

Start all services:

```sh
docker compose up -d
```

---

## Configuration

- `NODE_ENV` (default: `Production`)
- `MONGO_URL` (required): MongoDB connection string

## Environment Variables

Set environment variables via `docker run -e` or in your own `.env` file.

## Ports

- `3000`: Application
- `8081`: Mongo Express (if used)

## Development

```sh
npm install
npm start
```

---

## License

MIT License

## Author

Pranjal (prancodes)
