# Stage 1: Build the Next.js application
FROM node:20.14.0 AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

COPY . .

# Grant execute permissions to the script
RUN chmod +x rebuild.sh

# Command to execute after the container starts
CMD ["./rebuild.sh"]

# Aproach
# FROM nginx:1.26.0
# # For React.js production build
# # COPY --from=0 /app/build /usr/share/nginx/html

# # For Next.js production build
# COPY --from=builder /app/out /usr/share/nginx/html

# # Copy custom Nginx configuration
# COPY nginx.conf /etc/nginx/nginx.conf

# # Start nginx server inside next-fe container
# CMD ["nginx", "-g", "daemon off;"]