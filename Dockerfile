# Stage 1: Build the app
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Serve the built app
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Replace default Nginx config
# Ensure nginx.conf exists or provide a fallback configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# This is for documentation purposes and does not actually publish the port.
EXPOSE 80
# RUN echo 'server { listen 80; root /usr/share/nginx/html; index index.html; }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
# The 'daemon off' directive ensures that Nginx runs in the foreground,
# keeping the container alive as required for Docker containers.
CMD ["nginx", "-g", "daemon off;"]

