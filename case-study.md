# Задание № 5

### Шаг 1. Настроить сертификат для локального HTTPS

Сгенерировал локальный сертификат с помощью `mkcert`.

### Шаг 2. Настраиваем NGinx как reverse-proxy

Сделал запуск nginx из docker-контейнера.

### Шаг 3. Настроить HTTP/2 и server-push

Сделал соответствующие настройки в `nginx/localhost.conf`

### Шаг 4. Поэксперементировать с HTTP/2 server-push

Загрузка страницы до включения server-push:
![scr01.png](report/scr01.png)
![scr02.png](report/scr02.png)

Загрузка страницы после включения server-push:
![scr03.png](report/scr03.png)

### Шаг 5. Измерение эффекта сделанных изменений

### 5.1 Анализ без server-push

`report/browsertime_without_push.har`

### 5.2. Анализ с server-push

`report/browsertime_with_push.har`

### 5.3 Сравнение результатов

[Ссылка на сравнение HAR-файлов](https://compare.sitespeed.io/?har1=https://raw.githubusercontent.com/avbelyshev/rails-optimization-task5/master/report/browsertime_without_push.har&har2=https://raw.githubusercontent.com/avbelyshev/rails-optimization-task5/master/report/browsertime_with_push.har)

С server-push время загрузки страницы уменьшилось, запушенные картинки стали загружаться раньше остального контента.
