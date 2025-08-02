# Stage 1: Build
FROM node:20-bookworm-slim AS builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm ci && npm run build

# Stage 2: Run
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy built assets and dependencies
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /app

USER nextjs
EXPOSE 3000
CMD ["npm", "start"]