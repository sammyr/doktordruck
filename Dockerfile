# Basis-Image
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Kopiere package.json und package-lock.json
COPY package.json package-lock.json ./

# Installiere Abhängigkeiten
RUN npm ci --only=production

# Builder
FROM base AS builder
WORKDIR /app

# Kopiere node_modules vom deps-Stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Setze Umgebungsvariablen für den Build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build der Anwendung
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Kopiere die komplette .next Directory
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Setze den Benutzer
USER nextjs

# Exponiere den Port
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Starte die Anwendung
CMD ["node", "server.js"]
