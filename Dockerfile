# ========= Build Stage =========
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install clean dependencies
RUN npm ci

# Copy project files
COPY . .

# Build Next.js application
RUN npm run build


# ========= Run Stage =========
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only what Next.js needs to run
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

EXPOSE 3000

# Run server
CMD ["npm", "start"]
