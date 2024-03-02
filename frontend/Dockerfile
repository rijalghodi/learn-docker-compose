FROM node:alpine

LABEL version="1.0.0"

# Set the working directory
WORKDIR /app

# Copy the HTML, CSS, and JavaScript files into the container
COPY . .

# Install http-server globally via npm
RUN npm install

# Expose the port defined in the PORT environment variable
EXPOSE 3000

# Command to run the web server
CMD ["npm", "run", "start"]