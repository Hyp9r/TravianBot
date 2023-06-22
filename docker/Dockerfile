# Use an official Node.js runtime as the base image
FROM --platform=linux/amd64 node:16.3-slim as development

# Set the working directory inside the container
WORKDIR /app

# Set Puppeteer specific environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
#ENV DISPLAY=$HOST_IP:10.0 

# Install dependencies for running Chromium
RUN echo 'Installing puppeteer dependencies...'
RUN apt-get update && apt-get install gnupg wget -y && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Install ejs template engine
RUN npm install ejs

# Install logger
RUN npm install winston express-winston

# Install fontawesome
RUN npm install --save @fortawesome/fontawesome-free

# Install prisma
RUN npm install prisma

# Initialize prisma and datasource
RUN npx prisma init  --datasource-provider mysql

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