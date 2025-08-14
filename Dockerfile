# Simple, reliable Dockerfile for Railway deployment
FROM node:18-alpine

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Set working directory
WORKDIR /app

# Copy root package.json first (Railway looks for this)
COPY package*.json ./

# Copy server package.json and install dependencies
COPY server/package*.json ./server/
RUN cd server && npm ci --only=production

# Copy all application files
COPY server/ ./server/
COPY client/ ./client/

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S localshop -u 1001 && \
    chown -R localshop:nodejs /app

USER localshop

# Expose port (Railway will set PORT env var)
EXPOSE 4000

# Health check using the /health endpoint (not external file)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000/health || exit 1

# Start application with dumb-init (use root package.json start script)
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]