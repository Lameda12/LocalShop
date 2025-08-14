#!/bin/bash

# Railway Start Script for LocalShop
echo "🚀 Starting LocalShop Server..."

# Set production environment
export NODE_ENV=production

# Start the server
exec node server/src/index.js
