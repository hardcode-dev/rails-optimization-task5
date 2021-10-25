### Подготовка. Развертка проекта

- Использовал наработки задания №4, поэтому проблем почти не возникло.
- Пришлось поменять несколько путей к гемам и немного изменить версию ruby, т.к в текущем задании
  была указана версия 2.6.1, а в предыдущем - 2.6.3 (обновил до 2.6.3)

### Шаг 1. Настройка локального HTTPS

- Сертефикат сгенерирован с помощью `mkcert` - проблем не возникло.

### Шаг 2. Настройка NGinx как reverse-proxy

- Конфиг nginx положил в корень проекта, на всякий случай, чтобы не потерять.

### Шаг 3. Настройка HTTP/2 и server-push

- Дополнил конфиг nginx, перезапустил

### Шаг 4. Эксперимент с HTTP/2 server-push

- заменил inline_svg на image_tag
- симулировал slow 3g соединение
- картинки стали грузиться с задержкой в пару секунд
- добавил server-push и соответствующие хедеры для нескольких картинок
- загрузка картинок стала моментальной, в network консоли chrome видно что картинки грузятся по протоколу h2 c Initiator = other

### Шаг 5. Измерение эффекта сделанных изменений

- sitespeed.io не поддерживает mac на M1. Вот выдержка из документации:
  https://www.sitespeed.io/documentation/sitespeed.io/docker/
  Docker makes it easier to run sitspeed.io because you don’t need to install every dependency needed for recording and analysing the browser screen. It’s also easy to update your container to a new sitespeed.io version by changing the Docker tag. The drawback using Docker is that it will add some overhead, the container is Linux only (browsers are Linux version) and at the moment there’s no Docker containers that works on Mac M1.
- в качестве альтернативы был использован WebPageTest с ngrok. Результаты:
  Без server-push: https://www.webpagetest.org/result/211025_AiDc5W_6d0fbde54d8f59972c58482b9937396b/
  C server-push: https://www.webpagetest.org/result/211025_AiDcH0_f630d779aeec34c635471ccf4c71c867/
  Сравнение: https://www.webpagetest.org/video/compare.php?tests=211025_AiDcH0_f630d779aeec34c635471ccf4c71c867,211025_AiDc5W_6d0fbde54d8f59972c58482b9937396b

### Вывод

Благодаря http2 с server-push можно приоритизировать загрузку контента на страницу, делая сайт более user-friendly.
