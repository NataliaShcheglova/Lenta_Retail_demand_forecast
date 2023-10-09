from rest_framework import permissions

from django.contrib.auth import get_user_model

User = get_user_model()


class CustomPermissions(permissions.BasePermission):
    """
    Пользователи могут выполнять действия в зависимости от их роли:
    - Суперпользователь(администратор) могут выполнять любые действия.
    - Обычные пользователи могут только просматривать данные и выполнять действия с ними.
    - Неавторизованным пользователям запрещено выполнять любые действия.
    """
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.user.is_superuser:
                return True
            return False
        return False

    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            if request.user.is_superuser:
                return True
        return request.method in permissions.SAFE_METHODS


class CustomPermissionsAccess(permissions.BasePermission):
    """
    - Суперпользователь может раздавать все права.
    """
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.user.is_superuser:
                return True
            elif request.user.is_admin:
                if request.method == "PATCH" and "is_staff" in request.data:
                    return True
        return False


