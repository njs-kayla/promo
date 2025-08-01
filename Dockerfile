# Step 1: Build
FROM node:18 AS builder

ARG BRAND=sg
ENV BRAND=$BRAND

WORKDIR /app
COPY . .

RUN cp .env.$BRAND.local .env.local
RUN npm install
RUN npm run build:$BRAND

# Step 2: Run using standalone
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# 👇 這是 Next.js standalone 的標準結構
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]