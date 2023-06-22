
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

# Expose the port that the NestJS server will listen on (e.g., 3000)
EXPOSE 5000

# Start the NestJS server
CMD ["npm", "run", "start:dev"]