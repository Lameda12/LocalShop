# Multi-stage build for LocalShop
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY server/package*.json ./server/
COPY client/ ./client/

# Install server dependencies
RUN cd server && npm ci --only=production

# Production stage
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app directory
WORKDIR /app

# Copy built application
COPY --from=builder /app/server ./server
COPY --from=builder /app/client ./client

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S localshop -u 1001

# Change ownership
RUN chown -R localshop:nodejs /app
USER localshop

# Expose port
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node server/healthcheck.js || exit 1

# Start application with dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server/src/index.js"]
