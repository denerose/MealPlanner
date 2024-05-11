#!/bin/sh

# Set the NODE_ENV variable
export NODE_ENV=production
export DATABASE_URL="file:/database/${NODE_ENV}.sqlite"

# Run Prisma migrations
npx prisma migrate deploy
# for logging we also check the status of the deployments
npx prisma migrate status
# TODO Check the prisma docs for more info on if we should automatically run the `prisma migrate resolve` command if there are errors

# Start the Node app
node index.js