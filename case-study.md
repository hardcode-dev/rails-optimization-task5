# Case Study

### Шаг 1. Настроить сертификат для локального HTTPS

Можно сделать с использованием `mkcert`

### Шаг 2. Настраиваем NGinx как reverse-proxy

Установить или обновить `NGinx`.

Конфигурируем `NGinx` так, чтобы он принимал `https`-запросы `https://localhost` и ходил в `upstream` на `http://localhost:3000`.

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

На этом шаге браузер должен успешно открывать `https://localhost`

### Шаг 3. Настроить HTTP/2 и server-push

Дополняем конфиг `NGinx` поддержкой `HTTP/2` и `server-push`

```
server {
  listen  443 http2 ssl;
  #...

  location /{
    http2_push_preload on;
    #...
  }
}
```

### Шаг 4. Поэксперементировать с HTTP/2 server-push

На главном экране в мобильном виде `dev.to` есть ряд картинок:

- `connect.svg`
- `bell.svg`
- `menu.svg`
- `stack.svg`
- `lightning.svg`

![Screenshot](https://github.com/spajic/task-5/blob/master/screenshot.png?raw=true)

Картинки из меню: `connect.svg`, `bell.svg`, `menu.svg` – заинлайнены.
Картинки `stack.svg` и `lightning.svg` – нет.

Попробуйте перезагружать эту страницу с эмуляцией медленного соединения и посмотреть как рендерятся эти картинки при перезагрузке.

Дальше, давайте попробуем двинуться в сторону подхода `HTTP/2` и не будем инлайнить `svg`, а подключим их как обычные картинки.

Например, `image_tag("bell.svg", size: "100% * 100%")`

Теперь давайте добавим `server-push`!

Для этого нам нужно установить специальные заголовки:

```
# stories_controller.rb
def index
  push_headers = [
    "<#{view_context.asset_path('bell.svg')}>; rel=preload; as=image",
    "<#{view_context.asset_path('menu.svg')}>; rel=preload; as=image",
    "<#{view_context.asset_path('connect.svg')}>; rel=preload; as=image",
    "<#{view_context.asset_path('stack.svg')}>; rel=preload; as=image",
    "<#{view_context.asset_path('lightning.svg')}>; rel=preload; as=image",
  ]
  response.headers['Link'] = push_headers.join(', ')
  # ...
end
```

На этом шаге нужно убедиться, что `server-push` работает.

В `Chrome` `DevTools` в панели `Network` вы должны увидеть, что запросы к этим картинкам делаются по протоколу `h2`, а `Initiator` = `Push/Other`

Ещё один способ проверить работу `server-push` - утилита `http2-push-detect`

```
http2-push-detect https://localhost
Receiving pushed resource: /assets/bell.svg
Receiving pushed resource: /assets/menu.svg
Receiving pushed resource: /assets/connect.svg
Receiving pushed resource: /assets/stack.svg
Receiving pushed resource: /assets/lightning.svg
```

Теперь поэксперементируйте, попробуйте включать и выключать `server-push` для тех или иных картинок и оцените, как это сказывается на их рендеринге.

### Шаг 5. Измерение эффекта сделанных изменений

Сравним вариант с `server-push` и с обычными картинками без инлайнинга и без пуша.

Для этого воспользуемся `sitespeed.io` (**подробно расскажу об этом мощном инструменте в лекции №6**)

#### 5.1 Анализ без `server-push`

Выполните анализ версии без `server-push` и без `inline`:

```
docker run --rm -v "$(pwd)":/sitespeed.io sitespeedio/sitespeed.io --mobile -n 5 --preUrl https://host.docker.internal/ https://host.docker.internal/

# --mobile - мобильный вид
# -n 5 - 5 повторов
# --preUrl https://host.docker.internal/ - урл, первого захода
# https://host.docker.internal/ - урл повтороного захода, который и анализируем
# а вообще https://host.docker.internal/ - это https://localhost, на котором стоит ваш локальный `HTTP/2-proxy` с точки зрения `docker`.
```

Откройте сгенерированный отчёт `sitespeed.io`, зайдите на вкладку `Pages`, там провалитесь в отчёт по единственной странице, и внизу воспользуйтесь кнопкой `DOWNLOAD HAR` - сохраните `HAR`-файл, закомиттьте его.

#### 5.2. Анализ с `server-push`

Сделайте то же, что в пункте `5.1`, но с версией, где устанавливаются заголовки `server-push`. Сохраните `HAR`-файл, закомиттьте его.

#### 5.3 Сравнение результатов

Сравните два полученных `HAR`-файла с помощью https://compare.sitespeed.io/

**Обязательно добавьте ссылку на сравнение в описание `PR`**

Вы должны увидеть на `Waterfall`, что `server-push` картинки отправляются в самую первую очередь.

На `filmstrip` и `video` также можно увидеть, что `server-push` картинки действительно появляются заметно раньше.
