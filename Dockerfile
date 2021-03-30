### STAGE 1: Build ###

FROM node:lts-alpine as builder

# Set working directory.
RUN mkdir /app
WORKDIR /app


COPY package.json package-lock.json ./

ARG ENV=staging

RUN npm ci

COPY . /app

## Build the angular app in production mode and store the artifacts in dist folder

RUN npm run ng build -- --prod --aot --output-path=dist --buildOptimizer --base-href /room-booking-admin/ --configuration=${ENV}

# ### STAGE 2: Setup ###

FROM nginx:alpine

COPY --from=0 /app/dist /usr/share/nginx/html/room-booking-admin
