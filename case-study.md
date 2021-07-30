# Задание № 5

### Шаг 0 Подготовка

Поначалу хотел использовать наработки из предыдущего задания, чтобы не возиться с запуском проектом и подготовительными фиксами.
Отказался от этой затеи, так как решил поднимать проект в Docker.
Плюс было сходу было не понятно, как сдавать задание, если работать в репозитории предыдущего задания.

При запуске в Докере возникли новые сложности. В частности в pull реквесте будет множество

```
- class AddAliasForToTags < ActiveRecord::Migration
+ class AddAliasForToTags < ActiveRecord::Migration[4.2]
```

### Шаг 1. Настроить сертификат для локального HTTPS

Сгенерировал локальный сертификат с помощью `mkcert`.
Положил в папку /certs

### Шаг 2. Настраиваем NGinx как reverse-proxy

Добавил nginx в docker-compose и запустил проект в докере

### Шаг 3. Настроить HTTP/2 и server-push

Настроил `nginx/conf.d/default.conf`

### Шаг 4. Поэксперементировать с HTTP/2 server-push

Проверил загрузку страниц с помощью http2-push-detect
Посмотрел на загрузку картинок на медленном соединении: каритнки c http2-push загружаются визуально моментально
Без http2-push приходится ждать,

### Шаг 5. Измерение эффекта сделанных изменений

Тут возник блокер. sitespeed.io не заработал на моей машине Apple M1
Не придумал ничего лучше, кроме как развернуть проект на отдельном сервере, привязать к нему домен, чтобы можно было также с отдельного сервера запускать sitespeed.io
Но в итоге, получилось.

### 5.1 Анализ без server-push

`reports/NO_PUSH.har`

### 5.2. Анализ с server-push

`reports/WITH_PUSH.har`

### 5.3 Сравнение результатов

[Cравнение HAR-файлов](https://compare.sitespeed.io/?har1=https://raw.githubusercontent.com/otmosina/rails-optimization-task5/task_complete/reports/NO_PUSH.har&har2=https://raw.githubusercontent.com/otmosina/rails-optimization-task5/task_complete/reports/WITH_PUSH.har)

Выводы:

- с http2 push сайт загружается в разы быстрее
- sitespeed.io – мощный инструмент
