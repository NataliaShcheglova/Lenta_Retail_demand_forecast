import csv

from django.core.management.base import BaseCommand

from recipes.models import Forecast


class Command(BaseCommand):
    help = ' Загрузить данные в модель '

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Старт команды'))
        with open('sales_submission.csv', encoding='utf-8',
                  ) as data_file_forecast:
            forecast_data = csv.loads(data_file_forecast.read())
            for forecast in forecast_data:
                Forecast.objects.get_or_create(**forecast)

        self.stdout.write(self.style.SUCCESS('Данные загружены'))
