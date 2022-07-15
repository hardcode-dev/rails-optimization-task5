## Подготовка

- [x] Настройка окружения `local_production`
- [x] Настройка сертификата для локального HTTPS с использованием `mkcert`
- [x] Настройка NGinx как reverse-proxy
- [x] Настройка HTTP/2 и server-push

## Измерение эффекта сделанных изменений

### Анализ версии без server-push

![alt text](browsertime_wo_push.png 'Browser time without push')

### Анализ с server-push

![alt text](browsertime_w_push.png 'Browser time with push')
