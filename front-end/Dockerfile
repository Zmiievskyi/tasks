# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the entire project to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the port that the React app will run on (e.g., 3000)
EXPOSE 3000

# Serve the React app using a lightweight web server like 'serve'
CMD "npm" "start"
