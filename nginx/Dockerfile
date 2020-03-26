FROM nginx:1.17.9-alpine

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

COPY thirdparty/mkcert-v1.4.1-linux-amd64 /usr/local/bin/

EXPOSE 80

STOPSIGNAL SIGTERM
