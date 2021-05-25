### Шаг 1. Настроить сертификат для локального HTTPS

настроил сертификат для mkcert

### Шаг 2. Настраиваем NGinx как reverse-proxy

поставил nginx через docker, все заработало

### Шаг 3. Настроить HTTP/2 и server-push

все сделал как указано в readme

### Шаг 4. Поэксперементировать с HTTP/2 server-push

добавил заголовок и убрал инлайн картинки, картинки стали грузится в первую очередь

### Шаг 5. Измерение эффекта сделанных изменений

Сравнение HAR [ссылка на сравнение](https://compare.sitespeed.io/?har1=https://gist.githubusercontent.com/SynthesisOne/9003fe36aa4a8269322b6c618896d574/raw/1ad67def1aec25601e988d208aa2111519a18681/har&har2=https://gist.githubusercontent.com/SynthesisOne/67eb76d0f09b5e8ab8cd83d8c70bab5c/raw/8d82bb6dbcea293e8fb071163e3593598e1459e3/without_server_push.har).
