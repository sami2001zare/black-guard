# syntax=docker/dockerfile:1

FROM docker.arvancloud.ir/node:26-alpine AS builder
WORKDIR /app

# Copy package files and Prisma schema
COPY package.json package-lock.json* ./
COPY prisma ./prisma

# Configure npm for stable downloads
# RUN npm config set registry https://registry.npmjs.org/ && \
#     npm config set timeout 600000

# Install dependencies with cache mount (speeds up rebuilds)
RUN --mount=type=cache,target=/root/.npm \
    npm install --no-audit --no-fund

# Copy source and build
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production runner
FROM docker.arvancloud.ir/node:26-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    DATABASE_URL="file:/app/prisma/blackguard.db"

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Install Prisma CLI globally (only for migrations)
RUN npm install -g prisma@6.19.3 && npm cache clean --force

# Copy Prisma schema and migrations
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Prepare writable database location
RUN touch /app/prisma/blackguard.db && \
    chown nextjs:nodejs /app/prisma/blackguard.db && \
    chmod 664 /app/prisma/blackguard.db && \
    chown -R nextjs:nodejs /app/prisma

# Copy standalone build (includes only necessary node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Create uploads directory with proper permissions (for runtime uploads)
RUN mkdir -p /app/public/uploads && chown -R nextjs:nodejs /app/public/uploads

USER nextjs

EXPOSE 3000

CMD ["sh", "-c", "prisma migrate deploy && node server.js"]