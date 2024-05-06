#!/bin/sh

# Set the NODE_ENV variable
export NODE_ENV=production
export DATABASE_URL="file:/app/database/${NODE_ENV}.sqlite"

# Run Prisma migrations
npx prisma migrate ${NODE_ENV}

# Start the Node app
node index.js