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
# TODO, ensure no dev dependencices get installed? except maybe prisma?
RUN npm install 
RUN npx prisma generate
RUN npm run build:package

# pull in files into one final smaller image
FROM node:${NODE_VERSION} as prod_build

COPY --from=backend_build /tmp/dist /app/
COPY --from=backend_build /tmp/node_modules/ /app/node_modules/
COPY --from=frontend_build /tmp/dist /app/static/

WORKDIR /app
CMD /app/start.sh
