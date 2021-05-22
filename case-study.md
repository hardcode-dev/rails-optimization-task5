### Шаг 1. Настроить сертификат для локального HTTPS

Настроил TLS-сертификат для localhost с помощью mkcert

### Шаг 2. Настраиваем NGinx как reverse-proxy

Сделал как указано в readme, заработало.

### Шаг 3. Настроить HTTP/2 и server-push

Сделал как указано в readme, заработало.

### Шаг 4. Поэксперементировать с HTTP/2 server-push

Убрал inline для svg, добавил заголовок Link в ответ контроллера. В результате, эти иконки стали рендерятся на странице
визуально быстрее, чем раньше.

### Шаг 5. Измерение эффекта сделанных изменений

Сравнение двух HAR файлов [здесь](https://compare.sitespeed.io/?har1=https://raw.githubusercontent.com/dmi3-bu/rails-optimization-task5/solution/sitespeed-result/localhost/no_inline_push/no_inline_push.har&har2=https://raw.githubusercontent.com/dmi3-bu/rails-optimization-task5/solution/sitespeed-result/localhost/inline_push/inline-push.har).
Самым показательным оказался 4ый прогон, на котором видно что кривая visual progress начинает заполняться раньше при использовании server-push.
Также на waterfall видно, что запушенные svg переместились в самое начало загрузки.

### Bonus 1. Аудит dev.to

Прогнал dev.to через [webpagetest](https://www.webpagetest.org/result/210521_AiDcB9_288fdb894866ee472c4cc91f9f09eaa6/).
Все оценки почти на максималках, сложно найти большие точки роста. Отчет lighthouse жалуется на неиспользуемый js и css,
значит имеет смысл развивать проект в сторону code-splitting и critical css. Image Analysis в свою очередь предлагает возвращать
иконки и аватарки меньшего разрешения, учитывая размер мобильного экрана.
