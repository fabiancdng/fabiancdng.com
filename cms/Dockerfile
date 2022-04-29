FROM node:16-alpine
# Installing libvips-dev for sharp compatability
# RUN apk add --no-cache vips-dev
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY ./ .
RUN npm install
RUN npm run build
EXPOSE 1337
CMD ["npm", "start"]