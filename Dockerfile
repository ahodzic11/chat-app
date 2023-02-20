# Stage1: UI Build
FROM node:14-slim AS ui-build
WORKDIR /usr/src
COPY frontend/ ./ui/
RUN cd ui && npm install && npm start

# Stage2: API Build
FROM node:14-slim AS api-build
WORKDIR /usr/src
COPY backend/ ./api/
RUN cd api && npm install && npm start
RUN ls

# Stage3: Packagign the app
FROM node:14-slim
WORKDIR /root/
COPY --from=ui-build /usr/src/ui/build ./ui/build
COPY --from=api-build /usr/src/backend/dist .
RUN ls

EXPOSE 3080

CMD ["node", "backend.bundle.js"]