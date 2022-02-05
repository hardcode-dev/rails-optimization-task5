### SETUP

взял docker-compose.yml из предыдущей таски
поправил Gamefile

```ruby
gem "acts_as_follower", github: "tcocca/acts_as_follower", branch: "master"
gem "fix-db-schema-conflicts", github: "jakeonrails/fix-db-schema-conflicts", branch: "master"
```

### HTTPS + HTTP2

добавил nginx в docker-compose

```yml
nginx:
image: nginx:latest
container_name: dev_nginx
networks:
  default:
    aliases:
      - host-gateway
volumes:
  - ./docker/nginx/nginx.conf:/etc/nginx/nginx.conf
  - ./docker/nginx/certs:/etc/nginx/certs
ports:
  - 443:443
environment:
  RAILS_PORT: ${RAILS_PORT:-3000}
```

и сконфигурировал его под https + http2 + server push (взял конфиг из примера)
сертификаты сгенерил с помощью mkcert

```shell script
mkcert example.com "*.example.com" example.test localhost 127.0.0.1 ::1
```

### SERVER PUSH

сначала проверил как грузятся картинки на slow 3g в исходном варианте
как и ожидалось заинлайненые картинки не видны в network вкладке

затем убрал inline убедился, что теперь все картинуи видны в network вкладке
следующим шагом добавил server push заголовки и убедлися, что initiator изменился на `Push / Other`

### MEASURING IMPACT

c помощью sitespeed.io сделал аудит страницы с включенным/выключенным server push
![Alt text](/sitespeed-result/compare_reports.png?raw=true 'Compare Results')

заметных различий в метриках я не обнаружил
но по отчетам видно, что порядок загрузки изменился
(когда server push включен - картинки грузятся первыми)
