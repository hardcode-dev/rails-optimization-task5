# Case Study

### Шаг 1. Настроить сертификат для локального HTTPS

Воспользовался `mkcert`, проблем не возникло.

### Шаг 2. Настраиваем NGinx как reverse-proxy

Запуситл `nginx` из контейнера, добавил конфиг из задания. Без проблем.

Браузер успешно открыл `https://localhost`

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
