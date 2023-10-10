FROM python:3.10

COPY ml /app
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

CMD ["python", "app.py"]
