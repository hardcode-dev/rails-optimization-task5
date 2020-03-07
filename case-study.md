## Шаг 1 развертывание

- Перенес настройки nginx с предыдущего ДЗ
- Сохранил har и имппементировал пуш сохранил har [ссылка](https://drive.google.com/file/d/1OvC2le_Dv9o2h6PuBS6fgoqaU82sYsFJ/view?usp=sharing)
  - [Скрин compare before](https://prnt.sc/rd1d4h)
  - [Скрин compare after](https://prnt.sc/rd1daj)

* Сравнил через ker run --rm -v "\$(pwd)":/sitespeed.io sitespeedio/sitespeed.io:12.1.0 https://thinknetica.railsdev.site/
  - Вариант с сервер пуш - указал падения First Paint, First Visual Change, Fully Loaded на 130 мс каждый
