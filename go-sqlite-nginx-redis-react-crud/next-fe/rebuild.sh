#!/bin/bash

# Wait for backend service to be ready
while ! curl -sSf http://nginx/api/status >/dev/null; do
  sleep 1
done

# Run build and start commands for frontend service
# For ISR (same for SSR)
npm run build
npm start

# For SSG (Static Site Generation), after build, all static files located under /app/out
# You have to manually copy all files to /usr/share/nginx/html to serve it via Nginx