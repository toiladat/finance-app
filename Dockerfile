# ----------------------------
# 1️⃣ Build stage
# ----------------------------
FROM node:22-alpine AS builder
WORKDIR /app

RUN apk add --no-cache python3 make g++ bash

# Cài và bật pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build


# ----------------------------
# 2️⃣ Runtime stage (production)
# ----------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

# ✅ Bật lại pnpm cho stage này
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy toàn bộ app đã build
COPY --from=builder /app ./

# ✅ Chạy Next.js production server
CMD ["pnpm", "start"]
