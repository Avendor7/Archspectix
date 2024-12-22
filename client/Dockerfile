# Stage 1: Build the application
FROM node:23 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --only=production

COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine AS production-stage

## Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

## Copy the built files from builder stage to Nginx's HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

## Copy a custom configuration file if necessary
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]