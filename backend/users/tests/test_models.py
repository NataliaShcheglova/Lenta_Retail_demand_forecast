from django.test import TestCase
from django.db.utils import IntegrityError

from users.models import User


class UserModelTest(TestCase):

    def test_create_user(self):
        # Проверяем создание обычного пользователя
        user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword'
        )
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'test@example.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        # Проверяем создание суперпользователя
        admin_user = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='adminpassword'
        )
        self.assertEqual(admin_user.username, 'admin')
        self.assertEqual(admin_user.email, 'admin@example.com')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)

    def test_username_uniqueness(self):
        # Проверяем уникальность username
        User.objects.create_user(
            username='testuser',
            email='test1@example.com',
            password='testpassword1'
        )
        with self.assertRaises(IntegrityError):
            User.objects.create_user(
                username='testuser',
                email='test2@example.com',
                password='testpassword2'
            )
