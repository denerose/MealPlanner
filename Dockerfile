ARG NODE_VERSION=20-alpine3.18
# backend build step
FROM node:${NODE_VERSION} as frontend_build

WORKDIR /tmp/frontend/
COPY ./packages/frontend /tmp/
RUN npm install
RUN npm run build

#frontend build step
FROM node:${NODE_VERSION} as backend_build

WORKDIR /tmp
COPY ./packages/backend /tmp/
RUN npm install
RUN npm run build


# pull in files into one final smaller image
FROM node:${NODE_VERSION} as prod_build

COPY --from=backend_build /tmp/dist /app/
COPY --from=frontend_build /tmp/dist /app/static/

WORKDIR /app
CMD node /app/index.js

# # Set up build 
# WORKDIR /tmp
# COPY ./packages/backend /tmp/backend/
# COPY ./packages/frontend /tmp/frontend/

# # Build frontend
# WORKDIR /tmp/frontend
# RUN npm install 
# RUN npm run build

# # Build backend 
# WORKDIR /tmp/backend
# RUN npm install 
# RUN npm run build

# # Copy built files out

# WORKDIR /app

# RUN mkdir -p /app/backend
# RUN cp -r /tmp/backend/dist/ /app/backend/dist
# RUN cp /tmp/backend/package.json /app/backend/package.json
# RUN cp /tmp/backend/node_modules /app/backend/node_modules

# RUN mkdir -p /app/frontend
# RUN cp /tmp/frontend/dist/* /app/frontend/.

# # CMD node /app/backend/index.js