from django.test import TestCase

from api.models import Categories, Forecast, Sales, Shops
from api.serializers import (
    ShopSerializer,
    ForecastSerializer,
    CategoriesSerializer,
    SalesSerializer
    )


class ShopSerializerTestCase(TestCase):
    def test_shop_serializer(self):
        shop_data = {
            "store": "Test Store",
            "city": "Test City",
            "division": "Test Division",
            "type_format": 1,
            "loc": 2,
            "size": 1000,
            "is_active": True
        }
        serializer = ShopSerializer(data=shop_data)
        self.assertTrue(serializer.is_valid())


class ForecastSerializerTestCase(TestCase):
    def test_forecast_serializer(self):
        forecast_data = {
            "store": None,  # Replace with a valid shop object or ID
            "forecast_date": "2023-10-05",
            "forecast": {"key": "value"}
        }
        serializer = ForecastSerializer(data=forecast_data)
        self.assertTrue(serializer.is_valid())


class CategoriesSerializerTestCase(TestCase):
    def test_categories_serializer(self):
        category_data = {
            "sku": "Test SKU",
            "group": "Test Group",
            "category": "Test Category",
            "subcategory": "Test Subcategory",
            "uom": 10
        }
        serializer = CategoriesSerializer(data=category_data)
        self.assertTrue(serializer.is_valid())


# class SalesSerializerTestCase(TestCase):
#     def test_sales_serializer(self):
#         shop = Shops.objects.create(
#             store="Test Store",
#             city="Test City",
#             division="Test Division",
#             type_format=1,
#             loc=2,
#             size=1000,
#             is_active=True
#         )
#         category = Categories.objects.create(
#             sku="Test SKU",
#             group="Test Group",
#             category="Test Category",
#             subcategory="Test Subcategory",
#             uom=10
#         )
#         sales_data = {
#             "store": shop,
#             "sku": category,
#             "date": "2023-10-05",
#             "sales_type": 1,
#             "sales_units": 100,
#             "sales_units_promo": 50,
#             "sales_rub": 500.50,
#             "sales_run_promo": 250.25
#         }
#         serializer = SalesSerializer(data=sales_data)
#         self.assertTrue(serializer.is_valid())
