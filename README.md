# Хакатон "Лента х Практикум". Команда "5-ый элемент".

**Краткое описание:** Команда Мастерской Яндекс Практикума и команда Ленты подготовили хакатон, в рамках которого команды создают интерфейс и предсказательную модель по прогнозированию спроса на товары заказчика собственного производства (гранулярность ТК-SKU-День). Это общие репозиторий в котором собран результат работы всех членов команды "5-ый элемент".

**✨ [Ссылка на gh-pages](https://dumisel.github.io/lenta/#/) ✨**

**Цель:**
Сгенерировать различные признаки и придумать интерпретируемую, описывающую правильные
зависимости (повышение цены вызывает логичное падение спроса), модель прогноза спроса.
Дальше необходимо сделать подневной прогноз спроса на тестовом периоде для каждого товара
и магазина, и команда Ленты оценит его качество в сравнении с свершившимся фактом.
Метрикой качества будет выступать WAPE, посчитанный на уровне товар, магазин, день. Если
есть пропущенные значения и по каким-то товарам не предоставлен прогноз, прогноз считается
равным нулю.

## Установка:

Клонировать репозиторий и перейти в него в командной строке:
```shell
git clone https://github.com/Danspers/Lenta-time-series.git && cd Lenta-time-series
```
Клонировать и установить виртуальное окружение:
- для MacOS
```
python3 -m venv venv
source venv/bin/activate
```
- для Windows
```
python -m venv venv
source venv/Scripts/activate
```
Установить зависимости:
```
cd backend && pip install -r requirements.txt
```

В папке с файлом manage.py применить миграции:
```
python manage.py makemigrations
```
```
python manage.py migrate
```

Создание админа:
```
python manage.py createsuperuser
```

Выполните команду для запуска локально:
```
python manage.py runserver
```

Запуск тестов:
```
python manage.py test
```

Запустить все контейнеры:
```
docker-compose up -d --build
```

Выполнить миграции:
``` 
docker-compose exec backend python manage.py migrate 
```

Создать суперпользователя:
```
docker-compose exec backend python manage.py createsuperuser
```

Остановить работу всех контейнеров командой:
```
docker-compose down
```

### Документация проекта:
После локального запуска проекта (python manage.py runserver), для просмотра документации - http://127.0.0.1:8000/swagger/

### Примеры запросов:

- http://127.0.0.1:8000/api/forecast/ - прогнозы
- http://127.0.0.1:8000/api/shops/ - магазины
- http://127.0.0.1:8000/api/sales/ - товары
- http://127.0.0.1:8000/api/categories/ - категории товаров

## Используемые технологии:

- Python - https://www.python.org/
- Django - https://www.djangoproject.com/
- Django Rest Framework - https://www.django-rest-framework.org/
- Docker - https://www.docker.com/
- Rest API - https://www.django-rest-framework.org/topics/documenting-your-api/
- PostgreSQL - https://www.postgresql.org/

## Авторы проекта
Frontend-разработчики:
- [Елизавета Циприс](https://github.com/dumisel)
- [Дарья Лазарчук](https://github.com/dashalalala24)

Backend-разработчики:
- [Иван Матвеев](https://github.com/Ivanmatv)
- [Мария Старикова](https://github.com/Masha-Starikova)

Data Science специалисты:
- [Артем Скребцов](https://github.com/Skrebcov)
- [Данила Солтык](https://github.com/Danspers)
- [Наталья Щеглова](https://github.com/NataliaShcheglova)

Дизайнеры:
- [Кира Байгулова](https://www.notion.so/aae901ae80c54a44bea98618be37b25a)
- [Елизавета Пикина](https://www.notion.so/cc18bd9684904584bd5b283460624cc8?pvs=4)
- [Илья Болонин](https://www.notion.so/468438e9ce0745cb8e9aa5888dd3b4f5)

Project-менеджер:
- [Анастасия Баталова](https://www.linkedin.com/in/anastasiia-batalova-39078623a)
