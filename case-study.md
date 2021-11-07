### Шаг 1. Настроить сертификат для локального HTTPS

Создал сертификаты при помощи `mkcert`

### Шаг 2. Настраиваем NGinx как reverse-proxy

Установил `NGinx`.

Сконфигурировал `NGinx` так, чтобы он принимал `https`-запросы `https://localhost` и ходил в `upstream` на `http://localhost:3000`.

Браузер успешно открывает `https://localhost`

### Шаг 3. Настроить HTTP/2 и server-push

Дополнил конфиг `NGinx` поддержкой `HTTP/2` и `server-push`

### Шаг 4. Поэксперементировать с HTTP/2 server-push

На главном экране в мобильном виде `dev.to` есть ряд картинок:

- `connect.svg`
- `bell.svg`
- `menu.svg`
- `stack.svg`
- `lightning.svg`

Добавил для них `server-push`.

Без `server-push`:

![Screenshot](https://github.com/Exterm1nate/rails-optimization-task5/blob/master/results/without_push_network.jpg?raw=true)

С `server-push`:

![Screenshot](https://github.com/Exterm1nate/rails-optimization-task5/blob/master/results/push_network.jpg?raw=true)

### Шаг 5. Измерение эффекта сделанных изменений

Сравним вариант с `server-push` и с обычными картинками без инлайнинга и без пуша.

Для этого воспользовался `sitespeed.io`

#### 5.1 Анализ без `server-push`

![Screenshot](https://github.com/Exterm1nate/rails-optimization-task5/blob/master/results/without_push_waterfall.jpg?raw=true)

#### 5.2. Анализ с `server-push`

![Screenshot](https://github.com/Exterm1nate/rails-optimization-task5/blob/master/results/push_waterfall.jpg?raw=true)

#### 5.3 Сравнение результатов

`server-push` картинки отправляются в самую первую очередь.

По времени загрузки страницы существенных изменений нет, т.к. основное время занимает загрузка `js`-файла.
