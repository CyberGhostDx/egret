FROM oven/bun:1.3 AS base
WORKDIR /app

# Stage 1: Install dependencies
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Stage 2: Build the application
FROM base AS build
ARG BACKEND_URL
ENV BACKEND_URL=$BACKEND_URL

COPY --from=install /temp/dev/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN bun run build

# Stage 3: Production release
FROM base AS release
ENV NODE_ENV=production
WORKDIR /app

# Copy standalone build and static assets
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

ENV HOSTNAME "0.0.0.0"
ENV PORT 3000

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "server.js" ]
