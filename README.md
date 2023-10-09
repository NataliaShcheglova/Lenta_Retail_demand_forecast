# Lenta

**Краткое описание:**
Необходимо создать алгоритм прогноза спроса на 14 дней для товаров собственного
производства. Гранулярность ТК-SKU-День.

**Задача:**
Построить модель прогноза спроса на основе мастер данных и данных продаж с учетом разных
признаков.

**Цель:**
Сгенерировать различные признаки и придумать интерпретируемую, описывающую правильные
зависимости (повышение цены вызывает логичное падение спроса), модель прогноза спроса.
Дальше необходимо сделать подневной прогноз спроса на тестовом периоде для каждого товара
и магазина, и команда Ленты оценит его качество в сравнении с свершившимся фактом.
Метрикой качества будет выступать WAPE, посчитанный на уровне товар, магазин, день. Если
есть пропущенные значения и по каким-то товарам не предоставлен прогноз, прогноз считается
равным нулю.

### Установка:
Клонировать репозиторий и перейти в него в командной строке:
```
git clone https://github.com/Ivanmatv/Lenta_project.git
```
```
cd Lenta_project
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
cd backend
```
```
pip install -r requirements.txt
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

Запустить все контейнера командой:

```
docker-compose up -d --build
```

Выполнить миграции:

``` 
docker-compose exec backend python manage.py migrate 
```

Создайте суперпользователя:
```
docker-compose exec backend python manage.py createsuperuser
```

Наполните базу данных ингредиентами и тегами. Выполняйте команду из дериктории где находится файл manage.py:
```
python manage.py load_csv_data

```

Остановить работу всех контейнеров командой:
```
docker-compose down
```
Остановить работу все:
```
docker-compose down
```
### Документация проекта:
После локального запуска проекта ( python manage.py runserver ), для просмотра документации - 

http://127.0.0.1:8000/swagger/

### Примеры запросов:

- http://127.0.0.1:8000/api/forecast/ - прогнозы

- http://127.0.0.1:8000/api/shops/ - магазины

- http://127.0.0.1:8000/api/sales/ - товары

- http://127.0.0.1:8000/api/categories/ - категории товаров

### Использумые технологии:

- Python - https://www.python.org/
- Django - https://www.djangoproject.com/
- Django Rest Framework - https://www.django-rest-framework.org/
- Docker - https://www.docker.com/
- Rest API - https://www.django-rest-framework.org/topics/documenting-your-api/
- PostgreSQL - https://www.postgresql.org/

## Авторы проекта
### backend developers:
https://github.com/Ivanmatv - Иван Матвеев

### frontend developers:

### designers:

### data science:
https://github.com/NataliaShcheglova - Наталья Щеглова

https://github.com/Danspers - Данила Солтык

https://github.com/Skrebcov - Артём Скребцов