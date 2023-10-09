from django.contrib.auth.models import (AbstractBaseUser, PermissionsMixin,
                                        BaseUserManager)
from django.core.exceptions import ValidationError

from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Введите Email.")
        if not username:
            raise ValueError("Введите Логин.")

        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Вы должны быть сотрудником.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Вы должны быть администратором.")

        return self.create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(
        'Логин',
        max_length=150,
        unique=True,
    )
    email = models.EmailField(
        'Электронная почта',
        max_length=254,
        unique=True,
    )
    first_name = models.CharField(
        'Имя',
        max_length=150,
    )
    last_name = models.CharField(
        'Фамилия',
        max_length=150,
    )
    photo = models.ImageField(
        'Фото',
        upload_to='user_photos/',
        blank=True,
        null=True,
    )
    # Флаг, указывающий, активен ли пользователь.
    is_active = models.BooleanField(default=True)
    # Флаг, указывающий, является ли пользователь сотрудником.
    is_staff = models.BooleanField(default=False)
    # Флаг, указывающий, является ли пользователь администратором.
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_short_name(self):
        return self.username

    def __str__(self):
        return self.username

    def clean(self):
        super().clean()
        # Проверяем уникальность username
        existing_user = User.objects.filter(username=self.username).exclude(pk=self.pk)
        if existing_user.exists():
            raise ValidationError({'username': 'Пользователь с таким именем уже существует.'})
