#!/bin/bash

trap "exit" INT TERM
trap "kill 0"

APP_NAME=${CUSTOM_APP_NAME:="server_app"}
APP_PORT=${CUSTOM_APP_PORT:="3000"}
APP_VHOST=${CUSTOM_APP_VHOST:="dev.lvh.me"}
#APP_VHOST=${CUSTOM_APP_VHOST:="$(curl http://13.239.133.150/latest/meta-data/public-hostname))"}

for f in "/etc/nginx/sites-avalible/*.conf"
do
  echo "Processing $f file conf.d"
  sed -i "s+APP_NAME+${APP_NAME}+g"       $f
  sed -i "s+APP_PORT+${APP_PORT}+g"       $f
  sed -i "s+APP_VHOST+${APP_VHOST}+g"     $f
  sed -i "s+STATIC_PATH+${STATIC_PATH}+g" $f
done

for f in "/etc/nginx/sites-enabled/*.conf"
do
  echo "Processing $f file conf.d"
  sed -i "s+APP_NAME+${APP_NAME}+g"       $f
  sed -i "s+APP_PORT+${APP_PORT}+g"       $f
  sed -i "s+APP_VHOST+${APP_VHOST}+g"     $f
  sed -i "s+STATIC_PATH+${STATIC_PATH}+g" $f
done

for f in "/etc/nginx/snippets/*.conf"
do
  echo "Processing $f file snippets"
  sed -i "s+APP_NAME+${APP_NAME}+g"         $f
  sed -i "s+APP_PORT+${APP_PORT}+g"         $f
  sed -i "s+APP_VHOST+${APP_VHOST}+g"       $f
  sed -i "s+STATIC_PATH+${STATIC_PATH}+g"   $f
done

cat /etc/nginx/sites-enabled/default.conf
echo  "Start up nginx for letsencrypt check, save PIDh"
nginx -g "daemon off;" &
export NGINX_PID=$!

link_config() {
  rm /etc/nginx/sites-enabled/default.conf
  ln -s /etc/nginx/sites-avalible/default.conf /etc/nginx/sites-enabled/
}

is_renewal_required() {
    # If the file does not exist assume a renewal is required
    last_renewal_file="/etc/letsencrypt/live/$1/privkey.pem"
    [ ! -e "$last_renewal_file" ] && return;

    # If the file exists, check if the last renewal was more than a week ago
    one_week_sec=604800
    now_sec=$(date -d now +%s)
    last_renewal_sec=$(stat -c %Y "$last_renewal_file")
    last_renewal_delta_sec=$(( ($now_sec - $last_renewal_sec) ))
    is_finshed_week_sec=$(( ($one_week_sec - $last_renewal_delta_sec) ))
    [ $is_finshed_week_sec -lt 0 ]
}

get_certificate() {
    echo "Getting certificate for domain $1 on behalf of user $2"
    PRODUCTION_URL='https://acme-v02.api.letsencrypt.org/directory'
    STAGING_URL='https://acme-staging-v02.api.letsencrypt.org/directory'

    if [ "${IS_STAGING}" = "1" ]; then
        letsencrypt_url=$STAGING_URL
        echo "Staging ..."
    else
        letsencrypt_url=$PRODUCTION_URL
        echo "Production ..."
    fi

    echo "running certbot ... $letsencrypt_url domain: $1 email: $2"

    certbot certonly --agree-tos --server $letsencrypt_url --email "$2" --webroot --webroot-path=/tmp/letsencrypt -d "$1"
}

if is_renewal_required $APP_VHOST; then
    if ! get_certificate $APP_VHOST $CERTBOT_EMAIL; then
        echo "Cerbot failed for  $APP_VHOST. Check the logs for details."
    fi
else
    echo "Not run certbot for  $APP_VHOST; last renewal happened just recently."
fi

kill -HUP $NGINX_PID # Shutdown nginx

if test -f "/etc/letsencrypt/live/$APP_VHOST/privkey.pem"; then
  link_config # switching to ssl
fi

cat /etc/nginx/sites-enabled/default.conf

exec "$@"
