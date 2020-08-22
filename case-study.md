# Case-study оптимизации

## Заметки от себя

### Шаг №1

Развернул и настроил проект.
Сгенерировал сертификаты через `mkcert`

Добавил окружение local-production
После этого, поставил nginx и создал в
`/etc/nginx/sites-available` файл конфиг и описал его

```
server {
    listen 443 http2 ssl;
    server_name localhost;

    ssl_certificate /home/supdex/localhost+2.pem;
    ssl_certificate_key /home/supdex/localhost+2-key.pem;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA$
    ssl_prefer_server_ciphers   on;

    location / {
      http2_push_preload on;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto https;
      proxy_redirect off;
      proxy_pass http://127.0.0.1:3000;
    }
}
```

### Шаг №2

После того, как развернул проект и запустил его в режиме local-production, необходимо было отобразить локальный сервер на смартфоне.

Определил айпи адрес по которому можно через смартфон (через wi-fi сеть) использовать локальный сервер

```
ifconfig | grep "inet " | grep -v 127.0.0.1
```

Далее, подключил смартфон по usb, разрешил передачу данных в хроме и так использовал devtools.

Можно было сделать проще, просто в консоле выбрать режим смартфона, но используя явно смартфон, наверное, результаты будут надежнее =)

### Шаг №3

Разница в отображение inline svg файлов и в качестве загрузки в обычно режиме изображения - заметна

Когда использовал server-push, то все изображения(которые указал в заголовках) стали отображаться, также быстро, как и инлайн svg

Чтобы убедиться, что действительно отработал http 2, я просмотрел заголовки
![headers first](https://i.ibb.co/bzMcV1x/headers.png)

Также, в консоли мы видим, что отображаются с Initiator Push/Other
![console](https://i.ibb.co/3pZLC1G/console.jpg)

Ответ от http2-push-detect
![http2-push-detect](https://i.ibb.co/FHS1K3r/http2.jpg)

Если смотреть по sitespeed, то разница заметна
![sp_first](https://i.ibb.co/QM3mdTY/sp-first.jpg)

### Шаг №4

Поставил Falcon и решил сравнить результаты с ним

Вот что пишет sitespeed, сравнивая server-push falcon и puma
![falcon_puma](https://i.ibb.co/jr0G608/sp-second.jpg)

Где HAR1 это Falcon. Разница ощутима

Также, AB бенчмарк по запросу `ab -kc 100 -t 10 http://localhost:3000/`

Puma:

```
Time taken for tests:   13.324 seconds
```

![puma](https://i.ibb.co/9qb1WVv/puma.jpg)

Falcon

```
Time taken for tests:   10.052 seconds
```

![falcon](https://i.ibb.co/dkfxnm2/falcon.jpg)

## Результаты

Познакомился и научился работать с HTTP2, с инструментом webpagetest, sitespeed а также app сервером Falcon
