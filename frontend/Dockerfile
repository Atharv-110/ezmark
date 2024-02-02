# Use the official Node.js image as a base image
FROM node:alpine

# Create a non-root user
RUN addgroup -g 1001 -S appuser && adduser -u 1001 -S appuser -G appuser

# Set the working directory to /app
WORKDIR /app

# Copy only the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install application dependencies as the non-root user
RUN npm install && chown -R appuser:appuser .

# Switch to the non-root user
USER appuser

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Command to run the application
CMD ["npm", "run", "dev"]
