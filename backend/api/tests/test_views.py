from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIRequestFactory

from api.models import Categories, Forecast, Sales, Shops
from users.models import User
from api.views import (
    ShopViewSet,
    ForecastViewSet,
    CategoriesViewSet,
    SalesViewSet
)


class ViewsTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@mail.com'
        )
        self.token = Token.objects.create(user=self.user)
        self.shop = Shops.objects.create(
            store="Shop 1",
            city="Moscow",
            division="Moscow",
            type_format="1",
            loc="1",
            size="1",
            is_active=True
        )
        self.forecast = Forecast.objects.create(
            store=self.shop,
            forecast_date="2023-10-07",
            forecast={}
        )
        self.category = Categories.objects.create(
            sku="Milk",
            group="group 1",
            category="Category 1",
            subcategory="Milk1"
        )
        self.sale = Sales.objects.create(
            store=self.shop,
            sku=self.category,
            date="2023-10-07",
            sales_type="1",
            sales_units="1",
            sales_units_promo="1",
            sales_rub="10",
            sales_run_promo="10",
        )

    def test_shop_viewset(self):
        view = ShopViewSet.as_view({'get': 'list'})
        request = self.factory.get('/api/shops/')
        request.auth = self.token
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_forecast_viewset(self):
        view = ForecastViewSet.as_view({'get': 'list', 'post': 'create'})
        request = self.factory.get('/api/forecasts/')
        request.auth = self.token
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_categories_viewset(self):
        view = CategoriesViewSet.as_view({'get': 'list'})
        request = self.factory.get('/api/categories/')
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_sales_viewset_list(self):
        view = SalesViewSet.as_view({'get': 'list'})
        request = self.factory.get('/api/sales/')
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_sales_viewset_list_with_date_filter(self):
        view = SalesViewSet.as_view({'get': 'list'})
        request = self.factory.get('/api/sales/', {'date': '2023-10-07'})
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_sales_viewset_detail(self):
        view = SalesViewSet.as_view({'get': 'retrieve'})
        request = self.factory.get('/api/sales/1/')
        response = view(request, pk=self.sale.pk)
        self.assertEqual(response.status_code, 200)
