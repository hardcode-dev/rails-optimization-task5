# Case-study оптимизации

## План работы:

### Шаг 1. Настроить сертификат для локального HTTPS

- установил `mkcert` и сгенерировал сертификаты в папку `certs`

### Шаг 2. Настраиваем NGinx как reverse-proxy

- установил `nginx` локально
  - сначала хотел сделать через `docker-compose`, но столкнулся с проблемой сети
    ```bigquery
    reverse    | 2021/06/09 18:19:30 [error] 24#24: *7 connect() failed (111: Connection refused) while connecting to upstream, client: 172.19.0.1, server: localhost, request: "GET / HTTP/2.0", upstream: "http://127.0.0.1:3000/", host: "127.0.0.1"
    reverse    | 2021/06/09 18:19:30 [warn] 24#24: *7 upstream server temporarily disabled while connecting to upstream, client: 172.19.0.1, server: localhost, request: "GET / HTTP/2.0", upstream: "http://127.0.0.1:3000/", host: "127.0.0.1"
    reverse    | 2021/06/09 18:19:30 [error] 24#24: *7 connect() failed (111: Connection refused) while connecting to upstream, client: 172.19.0.1, server: localhost, request: "GET / HTTP/2.0", upstream: "http://127.0.0.1:3000/", host: "127.0.0.1"
    reverse    | 2021/06/09 18:19:30 [warn] 24#24: *7 upstream server temporarily disabled while connecting to upstream, client: 172.19.0.1, server: localhost, request: "GET / HTTP/2.0", upstream: "http://127.0.0.1:3000/", host: "127.0.0.1"
    reverse    | 172.19.0.1 - - [09/Jun/2021:18:19:30 +0000] "GET / HTTP/2.0" 502 157 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15" "-"
    ```
- скопировал конфиг `local.conf`
- заработал `https://localhost`
