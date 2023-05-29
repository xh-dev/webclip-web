FROM node:16.14.2 as node-build
COPY . /app/
WORKDIR /app
ARG branchName
ARG commitId
ENV branchName=${branchName}
ENV commitId=${commitId}
RUN sed -i "s|UnknownBranchName|${branchName}|g" ./src/environments/environment.prod.ts
RUN sed -i "s|UnknownCommitId|${commitId}|g" ./src/environments/environment.prod.ts
RUN npm install
RUN npm run build-prod

FROM nginx:mainline-alpine
#COPY docker-resource/html /usr/share/nginx/html
COPY --from=node-build /app/dist/webclip2 /usr/share/nginx/html

EXPOSE 80

