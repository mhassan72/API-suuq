# Use an official Node.js image from Docker Hub
FROM node:18.17.1
# Set the working directory inside the container
# Set the working directory inside the container
WORKDIR /usr/src/app
# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
# Install production dependencies
RUN npm install --only=production
# Copy only the dist directory (the transpiled code)
COPY dist ./dist
# Optionally, copy environment variables or configuration files
COPY .env ./
# Expose the port your app will run on
EXPOSE 3000
# Start the app using the transpiled code
CMD ["node", "dist/index.js"]
