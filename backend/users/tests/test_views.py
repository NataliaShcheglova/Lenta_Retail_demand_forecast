import json
from django.test import TestCase
from rest_framework.test import APIRequestFactory
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from users.models import User
from users.views import CustomUserViewSet


class CustomUserViewSetTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.create_user(
            username="testuser",
            email='test@mail.com',
            password="testpassword"
        )
        self.token = Token.objects.create(user=self.user)
        self.view = CustomUserViewSet.as_view({'get': 'user_info'})

    def test_user_info(self):
        request = self.factory.get('/api/user_info/')
        request.user = self.user
        request.META['HTTP_AUTHORIZATION'] = f'Token {self.token.key}'
        response = self.view(request)
        response.render()
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertIn('token', data)
        self.assertIn('user_data', data)
        self.assertEqual(data['user_data']['username'], self.user.username)

    def test_user_info_unauthenticated(self):
        request = self.factory.get('/api/user_info/')
        response = self.view(request)
        response.render()
        self.assertEqual(response.status_code, 401)
