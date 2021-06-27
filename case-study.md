# Задание №5

## Цели задания

В этом задании немного попрактикуемся с `HTTP/2` в `Rails`.

Польза:

- научиться настраивать `HTTPS` для локального `Rails`-приложения
- научиться настраивать `HTTP/2` `reverse proxy` с поддержкой `server-push`
- научиться делать `server-push`, сравнить его с `inlining`

### Шаг 1. Настроить сертификат для локального HTTPS

Устанавливаем инструмент для создания сертификатов `mkcert`. Здесь можно воспользоваться инструкцией с `https://github.com/FiloSottile/mkcert`. Услановленная программа позволит создатьфайлы `localhost+2.pem`  и `localhost+2-key.pem`. Их можно сохранить в любом месте на диске. Нам в последующем понадобится полный путь до этих файлов.

### Шаг 2. Настраиваем NGinx как reverse-proxy

Установить или обновить **NGinx**.

Перед настройкой  необходимо убедиться, что ему ничего не мешает. Для этого в **Ubuntu** можно воспользоваться командой **ufw** (`Uncomplicated FireWall`) чтобы увидеть перечень предустановленных профилей приложений. 
```bash
$ sudo ufw app list
Apache
Apache Full
Apache Secure
CUPS
Nginx Full
Nginx HTTP
Nginx HTTPS
Samba
```

В нашем случае стоит **Apache**, сервис которого необходимо отключить `sudo service apache2  stop`. А сервис **Nginx** уже установлен и мы можем им воспользоваться. Если **Nginx** в списке выше отсутствует, то его необходимо установить `sudo apt install nginx`.

Конфигурируем **NGinx** так, чтобы он принимал `https`-запросы `https://localhost` и ходил в `upstream` на `http://localhost:3000`. Конфигурационный файл сервиса должен находиться по адресу `/etc/nginx/conf.d/default.conf` со следующим содержимым.

```
server {
  listen       443 ssl;
  server_name  localhost;

  ssl_certificate      /path/to/localhost.pem;
  ssl_certificate_key  /path/to/localhost-key.pem;
  ssl_session_timeout  5m;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:DES-CBC3-SHA:!RC4:!aNULL:!eNULL:!MD5:!EXPORT:!EXP:!LOW:!SEED:!CAMELLIA:!IDEA:!PSK:!SRP:!SSLv:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
  ssl_prefer_server_ciphers   on;

  location / {
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;
    proxy_redirect off;
    proxy_pass http://127.0.0.1:3000;
  }
}
```

После настроки конфигурационного файла включаем сервис `sudo service nginx  start`

На этом шаге браузер должен успешно открывать `https://localhost`

Если запуск сервиса **Nginx** сопровождается предупреждением об ошибке, то можно воспользоваться командой `systemctl status nginx.service`, чтобы получить подробную информацию о природе ошибки.
