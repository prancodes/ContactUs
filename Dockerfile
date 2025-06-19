	# Official, stable, compatible
FROM node:18-alpine

    # Add metadata labels for GitHub repository and description
LABEL org.opencontainers.image.source="https://github.com/prancodes/ContactUs"
LABEL org.opencontainers.image.description="Dockerized Node.js Contact Form backend with MongoDB storage"

    # Build‑time argument for NODE_ENV (defaults to production)
ARG NODE_ENV=Production
    # Persist that value into the image
ENV NODE_ENV=$NODE_ENV

    # Set working directory inside the image
WORKDIR /contactApp

    # Copy package.json and install dependencies
COPY package.json ./
RUN npm install

    # Copy application code
COPY . .

    # Documents the listening ports for User/Developers
EXPOSE 3000

    # Default start command
CMD [ "node", "server.js" ]
