
FROM nginx
LABEL maintainer="Taras Bilous <tbilous@gmail.com>"

VOLUME /etc/letsencrypt
VOLUME /tmp/letsencrypt
EXPOSE 8080
EXPOSE 443
ARG CONFIG_FILE

# Do this apt/pip stuff all in one RUN command to avoid creating large
# intermediate layers on non-squashable docker installs
RUN apt update && \
    apt install -y python python-dev libffi6 libffi-dev libssl-dev curl build-essential && \
    curl -L 'https://bootstrap.pypa.io/get-pip.py' | python && \
    pip install -U cffi certbot && \
    apt remove --purge -y python-dev build-essential libffi-dev libssl-dev curl && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /var/lib/letsencrypt

COPY configs/nginx.conf /etc/nginx/nginx.conf

COPY configs/sites-enabled/default.conf /etc/nginx/sites-enabled/default.conf
COPY configs/sites-avalible/default.conf /etc/nginx/sites-avalible/default.conf
COPY configs/snippets/*.conf /etc/nginx/snippets/
COPY ./docker-entrypoint.sh /
RUN chmod +x ./docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
