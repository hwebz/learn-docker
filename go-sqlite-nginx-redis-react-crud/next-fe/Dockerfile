# Stage 1: Build the Next.js application
FROM node:20.14.0 AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

# Build the Next.js Static Site Generation (SSG) rendering mode
RUN npm run build

# Stage 2: Serve the static files with Nginx
FROM nginx:1.26.0
# For React.js production build
# COPY --from=0 /app/build /usr/share/nginx/html

# For Next.js production build
COPY --from=builder /app/out /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Start nginx server inside next-fe container
CMD ["nginx", "-g", "daemon off;"]