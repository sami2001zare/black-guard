# syntax=docker/dockerfile:1

FROM docker.arvancloud.ir/node:26-alpine AS builder
WORKDIR /app

# Copy package files and prisma schema (needed for prisma generate in postinstall)
COPY package.json package-lock.json* ./
COPY prisma ./prisma

# Configure npm to use official registry and increase timeout
# RUN npm config set registry https://registry.npmjs.org/ && \
#     npm config set timeout 600000

# Install dependencies with cache mount (speeds up rebuilds)
# RUN --mount=type=cache,target=/root/.npm \
RUN npm install

# Copy the rest of the application
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js app
RUN npm run build

# Production stage
FROM docker.arvancloud.ir/node:26-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy the built application from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]