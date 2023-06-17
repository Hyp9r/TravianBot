# Use an official Node.js runtime as the base image
FROM node:16.2-alpine as development

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

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