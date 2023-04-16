# Case-study оптимизации

## 1. Настроить сертификат для локального HTTPS

## 2. Настраиваем NGinx как reverse-proxy

## 3. Настроить HTTP/2 и server-push

Поднял dev.to локально.
С помощью 'mkcert' создал сертификаты.
Установил и сконфигурировал `NGinx` как reverse-proxy.
Поднял `https://localhost`
Дополнил конфиг `NGinx` поддержкой `HTTP/2` и `server-push`. Итоговый конфиг - /opt/homebrew/etc/nginx/servers/devto.conf

```bash
server {
   listen       443 http2 ssl;
   server_name  localhost;

   ssl_certificate      /opt/homebrew/etc/nginx/certs/localhost.pem;
   ssl_certificate_key  /opt/homebrew/etc/nginx/certs/localhost-key.pem;

   ssl_session_cache    shared:SSL:1m;
   ssl_session_timeout  5m;

   ssl_ciphers  'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:DES-CBC3-SHA:!RC4:!aNULL:!eNULL:!MD5:!EXPORT:!EXP:!LOW:!SEED:!CAMELLIA:!IDEA:!PSK:!SRP:!SSLv:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
   ssl_prefer_server_ciphers  on;

   location / {
        http2_push_preload on;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_redirect off;
        proxy_pass http://127.0.0.1:3000;
    }
}
```

Убедился, что ресурсы получаются по протоколу http/2

## 4. Поэксперементировать с HTTP/2 server-push

Настроил server-push. Проверил утилитой http2-push-detect:

```
+ http2-push-detect@1.0.4
added 2 packages from 9 contributors in 0.782s
❯ http2-push-detect 'https://localhost'
Receiving pushed resource: /assets/bell.svg
Receiving pushed resource: /assets/menu.svg
Receiving pushed resource: /assets/connect.svg
Receiving pushed resource: /assets/stack.svg
Receiving pushed resource: /assets/lightning.svg
```

Подготовил har-отчеты (также приложил скрины)

С помощью https://host.docker.internal подключил nginx через docker, удобно, и логи сразу видны (полезно на будущее)
