# Case-study оптимизации

## План работы:

### Шаг 1. Настроить сертификат для локального HTTPS

- установил `mkcert` и сгенерировал сертификаты в папку `certs`

### Шаг 2. Настраиваем NGinx как reverse-proxy

- установил `nginx` локально
  - сначала хотел сделать через `docker-compose`, но столкнулся с проблемой сети
    ```
    reverse    | 2021/06/09 18:19:30 [error] 24#24: *7 connect() failed (111: Connection refused) while connecting to upstream, client: 172.19.0.1, server: localhost, request: "GET / HTTP/2.0", upstream: "http://127.0.0.1:3000/", host: "127.0.0.1"
    reverse    | 2021/06/09 18:19:30 [warn] 24#24: *7 upstream server temporarily disabled while connecting to upstream, client: 172.19.0.1, server: localhost, request: "GET / HTTP/2.0", upstream: "http://127.0.0.1:3000/", host: "127.0.0.1"
    reverse    | 2021/06/09 18:19:30 [error] 24#24: *7 connect() failed (111: Connection refused) while connecting to upstream, client: 172.19.0.1, server: localhost, request: "GET / HTTP/2.0", upstream: "http://127.0.0.1:3000/", host: "127.0.0.1"
    reverse    | 2021/06/09 18:19:30 [warn] 24#24: *7 upstream server temporarily disabled while connecting to upstream, client: 172.19.0.1, server: localhost, request: "GET / HTTP/2.0", upstream: "http://127.0.0.1:3000/", host: "127.0.0.1"
    reverse    | 172.19.0.1 - - [09/Jun/2021:18:19:30 +0000] "GET / HTTP/2.0" 502 157 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15" "-"
    ```
- скопировал конфиг `local.conf`
- заработал `https://localhost`

### Шаг 3. Настроить HTTP/2 и server-push

- обновил local.conf
- все заработало

### Шаг 4. Поэксперементировать с HTTP/2 server-push

- убрал `inline`
- добавил `server-push`
- познакомился с утилитой `http2-push-detect`
- начало грузиться быстрее

### Шаг 5. Измерение эффекта сделанных изменений

- выполнил анализ при помощи `sitespeed`
- сохранил результаты `before.har` и `after.har`
- проанализировал прогоны, очень интересный инструмент
