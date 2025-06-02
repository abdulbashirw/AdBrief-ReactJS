FROM node:20.18.1-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Builder untuk production
FROM base AS builder-prod
RUN npm run build

# Builder untuk staging
FROM base AS builder-staging
RUN npm run build -- --mode staging

# Builder untuk development
FROM base AS builder-dev
RUN npm run build -- --mode development

# Production environment
FROM node:20.18.1-alpine AS prod
WORKDIR /app

COPY --from=builder-prod /app/dist ./dist
COPY --from=builder-prod /app/public ./public
COPY --from=base /app/.env.prod ./.env.prod

RUN npm install -g serve

EXPOSE 4173

CMD ["serve", "-s", "dist", "-l", "4173"]

# Staging environment
FROM node:20.18.1-alpine AS staging
WORKDIR /app

COPY --from=builder-staging /app/dist ./dist
COPY --from=builder-staging /app/public ./public
COPY --from=base /app/.env.staging ./.env.staging

RUN npm install -g serve

EXPOSE 4173

CMD ["serve", "-s", "dist", "-l", "4173"]

# Staging environment
FROM node:20.18.1-alpine AS dev
WORKDIR /app

COPY --from=builder-dev /app/dist ./dist
# COPY --from=builder-dev /app/public ./public
COPY --from=base /app/.env.dev ./.env.dev

RUN npm install -g serve

EXPOSE 4173

CMD ["serve", "-s", "dist", "-l", "4173"]