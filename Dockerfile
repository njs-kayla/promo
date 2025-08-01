# Step 1: Build
FROM node:18 AS builder

ARG BRAND=sg

ENV BRAND=$BRAND

WORKDIR /app
COPY . .

RUN npm install

RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
