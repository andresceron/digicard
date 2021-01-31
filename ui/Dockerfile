### STAGE 1: Build angular app ###
FROM node:14 AS build

# Create app directory
WORKDIR /builddir

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Clean cache and install node_modules
RUN npm install

# Bundle app source
COPY . .

# Run the command to build application
RUN npm run build

### STAGE 2: Run the build ###
FROM nginx:1.17.1-alpine
EXPOSE 80
COPY --from=build /builddir/dist/angularnode /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
