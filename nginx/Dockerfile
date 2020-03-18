FROM nginx:1.17.9-alpine

COPY thirdparty/mkcert-v1.4.1-linux-amd64 /usr/local/bin/

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
