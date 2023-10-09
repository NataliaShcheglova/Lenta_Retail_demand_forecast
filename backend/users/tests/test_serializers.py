from django.test import TestCase

from users.serializers import (
  CustomUserCreateSerializer,
  CustomUserSerializer
)

from users.models import User


class CustomUserCreateSerializerTest(TestCase):
    def test_create_user(self):
        # Создайте данные пользователя для теста
        user_data = {
            'email': 'test@example.com',
            'username': 'testuser',
            'first_name': 'John',
            'last_name': 'Doe',
            'password': 'testpassword',
        }

        serializer = CustomUserCreateSerializer(data=user_data)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()

        # Проверьте, что созданный пользователь совпадает с входными данными
        self.assertEqual(user.email, user_data['email'])
        self.assertEqual(user.username, user_data['username'])
        self.assertEqual(user.first_name, user_data['first_name'])
        self.assertEqual(user.last_name, user_data['last_name'])


class CustomUserSerializerTest(TestCase):
    def test_user_serialization(self):
        # Создайте тестового пользователя
        user = User.objects.create(
            username='testuser',
            first_name='John',
            last_name='Doe',
            email='test@example.com',
            password='testpassword'
        )

        serializer = CustomUserSerializer(user)
        serialized_data = serializer.data

        # Проверьте, что сериализованные данные содержат правильные поля
        self.assertEqual(serialized_data['id'], user.id)
        self.assertEqual(serialized_data['username'], user.username)
        self.assertEqual(serialized_data['first_name'], user.first_name)
        self.assertEqual(serialized_data['last_name'], user.last_name)
