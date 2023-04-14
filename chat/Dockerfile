# Use an official Node.js runtime as a parent image
FROM node:18.13.0

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies using npm
RUN npm install

# Copy the rest of the app source code to the container
COPY . .

# Set the environment variable
#ENV PORT=5003

ARG PORT
ARG CONNECTION_URL
#ARG REACT_APP_MAPS_API_KEY

# Expose port 3000 to the outside world
EXPOSE 5003

# Start the app
CMD ["npm", "start"]
