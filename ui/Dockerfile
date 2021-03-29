### STAGE 1: Build angular app ###
FROM node:14-alpine AS build

# Create app directory
WORKDIR /builddir

COPY ./ui/package*.json ./

COPY ./ui/nginx.conf /nginx.conf

RUN npm ci

COPY . .

# Run the command to build application
RUN npm run build

### STAGE 2: Run the build ###
FROM nginx:1.17.1-alpine

EXPOSE 80

COPY --from=build /builddir/dist/angularnode /usr/share/nginx/html
COPY --from=build /nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
