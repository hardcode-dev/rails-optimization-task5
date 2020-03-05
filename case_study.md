## Задача - попрактиковаться в HTTP/2 для Rails

1. Установил сертификаты безопасности локально
2. Насторил NGINX как прокси
3. Настроил HTTP/2 и server-push. Сначала, как я писал в дневниках, у меня были сомнения, что это работает, но после того, как я сделал сравнение на https://compare.sitespeed.io/?gist=5c0d8976125800743a226ac6505fd03d, я увидел, что картинки и вправду пушатся в первую очередь.
4. Провел анализ без изменений и с ними с помощью сервиса sitespeed.io

================
01.03.2020

Установил сегодня mkcert и сгенерировал себе сертификаты.
Установил nginx и изменил ему nginx.conf, как было показано в лекции, но почему то прокся не срабатывает. В хроме я вижу, что несколько запросов шлются через http/2+quic/46 и даже парочка через h2, как в лекции, но большинство - через http/1.1.

Я сперва подумал, может быть, пути к сертификату и ключу я неправильно указал
`ssl_certificate ~/thinknetica/rails-optimization-task5/localhost.pem; ssl_certificate_key ~/thinknetica/rails-optimization-task5/localhost-key.pem;`
но даже после того, как я сменил их на

`ssl_certificate /localhost.pem; ssl_certificate_key /localhost-key.pem;`

ничего не поменялось. Что-то явно не так.

======================
02.03.2020

Немножко подтормозил сегодня с nginx, но вся проблема была связана с тем, что сам nginx то я и не запустил. А после единственное, что меня смутило (и смущает до сих пор) - это что среди множества разных загрузок я вижу как протоколы http1/1, так и протокол h2. Причем, так было и до запуска nginx, и до включения туда http2. После добавления server-push директив в контроллер, также вижу указанные картинки и в http1.1, и в h2 протоколах, но истоник в h2 указан, как Other. Это значит, они не через server-push загрузились? Утилита http2-push-detect через brew не находится, а через npm не устанавливается так как не может найти библиотеку "https://github.com/sass/node-sass/releases/download/v4.11.0/darwin-x64-79_binding.node":

HTTP error 404 Not Found

Та же ошибка при попытке установить npm install -g sitespeed.io

node-sass uninstall and then
sudo npm install --unsafe-perm -g node-sass
помогло

sitespeed.io установился, а http2-push-detect все равно падает с ошибкой. Завтра попробую завершить 5-й шаг

docker run --rm -v "\$(pwd)":/sitespeed.io sitespeedio/sitespeed.io --mobile -n 5 --preUrl https://localhost

=========================
03.03.2020

docker run --rm -v "\$(pwd)":/sitespeed.io sitespeedio/sitespeed.io --mobile -n 5 --preUrl http://host.docker.internal/ https://host.docker.internal/

Закоммитился
Добавил ссылку на сравнение
Добавил конфиг nginx в репозиторий
Перекомиттился, пушнул форсом
Написал комментарий в PR и сдал ссылку на него в дз.
Завтра буду 6 лекцию смотреть.
