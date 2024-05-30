FROM node:20.14.0

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.26.0

# For React.js production build
# COPY --from=0 /app/build /usr/share/nginx/html

# For Next.js production build
COPY --from=0 /app/out ./usr/share/nginx/html