# Stage 1: Build
FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY ./src ./src

RUN npm install --include=dev

RUN npm run build && ls -R dist 

# Stage 2: Production image
FROM node:24-alpine

WORKDIR /app

RUN apk add --no-cache tini wget

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/dist ./dist   
COPY --from=builder /app/package.json ./

RUN npm install --omit=dev

COPY .env .

RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

# Graceful shutdown
ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "./dist/app.js"]