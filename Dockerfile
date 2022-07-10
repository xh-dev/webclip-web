FROM node:16.14.2 as node-build
COPY . /app/
WORKDIR /app
RUN npm install
RUN npm run build-prod

FROM nginx:stable-alpine
#COPY docker-resource/html /usr/share/nginx/html
COPY --from=node-build /app/dist/webclip2 /usr/share/nginx/html

EXPOSE 80

