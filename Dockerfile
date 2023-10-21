FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV production

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN npm install -g pm2

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --chown=nextjs:nodejs .next/standalone ./
COPY --chown=nextjs:nodejs .next/static ./.next/static

# Copy files hosted in the container (or in volumes).
COPY --chown=nextjs:nodejs ./public ./public

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["pm2-runtime", "server.js", "-i", "max"]