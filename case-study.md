# HW № 5

### Шаг 1. Настроить сертификат для локального HTTPS

Сгенерировал локальный сертификат с помощью `mkcert`.
Положил сгенерированные файлы в папку /etc/nginx/certs/localhost.pem, /etc/nginx/certs/localhost-key.pem

### Шаг 2. Настраиваем NGinx как reverse-proxy

Установил Nginx, создал серверный блок в папке /etc/nginx/sites-available/localhost (назвал его localhost).
Активировал файл, создав ссылку в директории sites-enabled

`sudo ln -s /etc/nginx/sites-available/localhost /etc/nginx/sites-enabled/`

### Шаг 3. Настроить HTTP/2 и server-push

Сделал соответствующие настройки в `/etc/nginx/sites-available/localhost`

### Шаг 4. Поэксперементировать с HTTP/2 server-push

### Шаг 5. Измерение эффекта сделанных изменений

Сравним вариант с server-push и с обычными картинками без инлайнинга и без пуша.

#### 5.1 Анализ без server-push

Проанализировал в sitespeed.io загрузку главной страницы без server_push, image_tag и http2.
По видео отчету время составляет 9.91 сек.
