FROM node:20-alpine3.18

# Set up build 
WORKDIR /tmp
COPY ./packages/backend /tmp/backend/
COPY ./packages/frontend /tmp/frontend/

# Build frontend
WORKDIR /tmp/frontend
RUN npm install 
RUN npm run build

# Build backend 
WORKDIR /tmp/backend
RUN npm install 
RUN npm run build

# Copy built files out

WORKDIR /app

RUN mkdir -p /app/backend
RUN cp -r /tmp/backend/dist/ /app/backend/dist
RUN cp /tmp/backend/package.json /app/backend/package.json
RUN cp /tmp/backend/node_modules /app/backend/node_modules

RUN mkdir -p /app/frontend
RUN cp /tmp/frontend/dist/* /app/frontend/.

# CMD node /app/backend/index.js