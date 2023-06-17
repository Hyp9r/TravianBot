# Use an official Node.js runtime as the base image
FROM node:16.2-alpine as development

# Set the working directory inside the container
WORKDIR /app

# Set Puppeteer specific environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Install dependencies for running Chromium
RUN apk update && apk upgrade && \
    apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Install ejs template engine
RUN npm install ejs

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# New container to copy build
FROM node:16.2-alpine as production

# Set enviroment
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=build /app/dist ./dist

# Set the command to run your application
CMD [ "node", "dist/index.js" ]