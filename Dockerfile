# Base image with dependencies
FROM node:lts-alpine AS base

WORKDIR /app

# Copy only package.json and yarn.lock initially for efficient caching
COPY package.json yarn.lock ./

# Install npm globally and enable corepack (for managing Yarn versions)
RUN npm i -g npm && corepack enable

# Pre-build STAGING configuration (common for all environments)
FROM base AS staging-builder

COPY . .
RUN yarn install
RUN yarn next telemetry disable
RUN yarn lint --fix
RUN yarn build:staging

# Production image (Nginx)
FROM nginx:stable-alpine AS staging

COPY .env.staging .
COPY --from=staging-builder /app/dist /app/dist

# Pre-build PROD configuration (common for all environments)
FROM base AS prod-builder

COPY . .
RUN yarn install
RUN yarn next telemetry disable
RUN yarn lint --fix
RUN yarn build:prod

# Production image (Nginx)
FROM nginx:stable-alpine AS prod

COPY .env.prod .
COPY --from=prod-builder /app/dist /app/dist

# Pre-build DEV configuration (common for all environments)
FROM base AS dev-builder

COPY . .
RUN yarn install
RUN yarn next telemetry disable
RUN yarn lint --fix
RUN yarn build:dev

# Production image (Nginx)
FROM nginx:stable-alpine AS dev

COPY .env.dev .
COPY --from=dev-builder /app/dist /app/dist