# Home Work 5

- [x] Настроил SSL (mkcert + nginx) + HTTP2

![ssl](https://raw.githubusercontent.com/VidgarVii/rails-optimization-2-task4/master/fixtures/ssl.png)

- [x] В StoriesController вызывал метож push_headers для всех svg данной страницы

#### Было

![ssl](https://raw.githubusercontent.com/VidgarVii/rails-optimization-2-task4/master/fixtures/svg.png)

```cassandraql
Requests per second:    29.07 [#/sec] (mean)
Time per request:       171.980 [ms] (mean)
Time per request:       34.396 [ms] (mean, across all concurrent requests)
Transfer rate:          3929.74 [Kbytes/sec] received
```

#### Cтало

![ssl](https://raw.githubusercontent.com/VidgarVii/rails-optimization-2-task4/master/fixtures/svg3.png)

```cassandraql
Requests per second:    29.89 [#/sec] (mean)
Time per request:       167.293 [ms] (mean)
Time per request:       33.459 [ms] (mean, across all concurrent requests)
Transfer rate:          3981.13 [Kbytes/sec] received

```

## webpagetest.org

Натравил webpagetest на локальный dev.to. (сайт вытащил в мир иной через ngrok)

Первое что приходит в голову, что инструменты профайлеры это конечно круто, но еще круче уметь их читать...
Хрустальный шар не понадобился.
Меленьки ленивец в футере слишком жирный.
![images](https://raw.githubusercontent.com/VidgarVii/rails-optimization-2-task4/master/fixtures/big_image.png)

Так как картинка статичная, по садил ее на диету с помощью популярного инструмента всех фронтов squoosh.

В waterflow картинка пропала.
![images2](https://raw.githubusercontent.com/VidgarVii/rails-optimization-2-task4/master/fixtures/big_image2.png)
