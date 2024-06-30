# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY back-end/package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application code
COPY back-end/ .

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV PORT=8000

# Run server.js when the container launches
CMD ["node", "src/server.js"]
