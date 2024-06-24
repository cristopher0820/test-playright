# Usa una imagen base de Node.js
FROM mcr.microsoft.com/playwright:v1.38.0-focal

# set the working directory in the container
WORKDIR /app

# Paste the package.json and package-lock.json to the container
COPY package*.json ./

# install project dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# install playwright browsers
RUN npx playwright install

# command by default to keep the container running (useful for debugging)
CMD ["tail", "-f", "/dev/null"]

# Command to run the tests (this command will be overwritten in the Jenkinsfile)
# CMD ["npx", "playwright", "test"]
