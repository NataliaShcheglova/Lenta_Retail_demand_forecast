from django.test import TestCase

from api.models import Shops, Forecast, Categories, Sales, SalesSub


class ModelTestCase(TestCase):

    def setUp(self):
        self.shop = Shops.objects.create(
            store='Магазин 1',
            city='Город 1',
            division='Дивизион 1',
            type_format=1,
            loc=1,
            size=100,
            is_active=True
        )
        self.forecast = Forecast.objects.create(
            store=self.shop,
            forecast_date='2023-01-01',
            forecast={"data": "example"}
        )
        self.category = Categories.objects.create(
            sku='Товар 1',
            group='Группа 1',
            category='Категория 1',
            subcategory='Подкатегория 1',
            uom=1
        )
        self.sales = Sales.objects.create(
            store=self.shop,
            sku=self.category,
            date='2023-01-01',
            sales_type=1,
            sales_units=10,
            sales_rub=100.0
        )
        self.sales_sub = SalesSub.objects.create(
            store=self.shop,
            sku=self.category,
            target=5,
            date='2023-01-01'
        )

    def test_shops_model(self):
        shop = Shops.objects.get(store='Магазин 1')
        self.assertEqual(shop.city, 'Город 1')
        self.assertEqual(shop.division, 'Дивизион 1')
        self.assertEqual(shop.type_format, 1)
        self.assertEqual(shop.loc, 1)
        self.assertEqual(shop.size, 100)
        self.assertTrue(shop.is_active)

    def test_forecast_model(self):
        forecast = Forecast.objects.get(store=self.shop)
        self.assertEqual(forecast.forecast, {"data": "example"})

    def test_categories_model(self):
        category = Categories.objects.get(sku='Товар 1')
        self.assertEqual(category.group, 'Группа 1')
        self.assertEqual(category.category, 'Категория 1')
        self.assertEqual(category.subcategory, 'Подкатегория 1')
        self.assertEqual(category.uom, 1)

    def test_sales_model(self):
        sales = Sales.objects.get(store=self.shop)
        self.assertEqual(sales.sku.sku, 'Товар 1')
        self.assertEqual(sales.sales_type, 1)
        self.assertEqual(sales.sales_units, 10)
        self.assertEqual(sales.sales_rub, 100.0)

    def test_sales_sub_model(self):
        sales_sub = SalesSub.objects.get(store=self.shop)
        self.assertEqual(sales_sub.target, 5)
        self.assertEqual(sales_sub.date.strftime('%Y-%m-%d'), '2023-01-01')
