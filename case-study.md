### Шаг 1. Настроить сертификат для локального HTTPS

1. Скачал и собрал из исходников утилиту mkcert
2. Сгенерировал сертификаты

### Шаг 2. Настраиваем NGinx как reverse-proxy

Сделал по образцу из readme. Ничего сложного

### Шаг 3. Настроить HTTP/2 и server-push

Настройка по образцу. Ничего сложного

### Шаг 4. Поэксперементировать с HTTP/2 server-push

Эксперемент с картинками принес результат. Картинки рендерятся на странице заметно быстрее по http2.

### Шаг 5. Измерение эффекта сделанных изменений

Для измерения эффекта от сделанных изменений предлагалось воспользоваться sitespeed.io, в частности следующей командой

```
docker run --rm -v "$(pwd)":/sitespeed.io sitespeedio/sitespeed.io --mobile -n 5 --preUrl https://host.docker.internal/ https://host.docker.internal/
```

Однако на Ubuntu не завелось. В отчете небыло показано ни одной страницы. Оказалось ubuntu пока не распознает https://host.docker.internal/
Немного изменил коменду - помогло

```
docker run --rm --net=host -v "$(pwd)":/sitespeed.io sitespeedio/sitespeed.io --mobile -n 5 --preUrl https://localhost/ https://localhost/
```

Сравнение двух HAR файлов доступно по [ссылке](https://compare.sitespeed.io/?har1=https://raw.githubusercontent.com/AgeevAndrew/rails-optimization-task5/master/sitespeed-result/browsertime_http.har&har2=https://raw.githubusercontent.com/AgeevAndrew/rails-optimization-task5/master/sitespeed-result/browsertime_http2.har)

### Результаты

На этой неделе было много нового для меня. Многого из рассмотренного в лекции не знал.
Узнал про http2 push, и как он работает, как настраивается локальный https при помощи mkcert. Узнал про WebPageTest.
