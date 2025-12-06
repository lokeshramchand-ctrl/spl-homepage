# ========= Build Stage =========
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies clean inside the container
RUN npm ci

COPY . .

# Ensure esbuild binary is correct for Alpine
RUN npm rebuild esbuild

RUN npm run build

# ========= Serve With NGINX =========
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
