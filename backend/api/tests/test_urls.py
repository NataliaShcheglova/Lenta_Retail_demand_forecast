from django.test import TestCase

from rest_framework.test import APIClient

from users.models import User

from api.models import Sales, Categories, Shops, Forecast


class TestAPIEndpoints(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword', email='email@mail.com')
        self.client.force_authenticate(user=self.user)

    def test_sales_endpoint(self):
        response = self.client.get('/api/sales/')
        self.assertEqual(response.status_code, 200)  # Проверьте код статуса и другие аспекты вашего ответа

    def test_categories_endpoint(self):
        response = self.client.get('/api/categories/')
        self.assertEqual(response.status_code, 200)

    def test_shops_endpoint(self):
        response = self.client.get('/api/shops/')
        self.assertEqual(response.status_code, 200)

    def test_shops_endpoint(self):
        response = self.client.get('/api/forecast/')
        self.assertEqual(response.status_code, 200)
