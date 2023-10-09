from djoser.serializers import UserCreateSerializer, UserSerializer

from rest_framework.permissions import AllowAny

from .models import User


class CustomUserCreateSerializer(UserCreateSerializer):
    """
    Сериализатор для регистрации пользователя.
    """
    class Meta:
        model = User
        fields = (
            'email',
            'id',
            'username',
            'first_name',
            'last_name',
            'password',
        )
        extra_kwargs = {'password': {'write_only': True}}

    permission_classes = [AllowAny]

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class CustomUserSerializer(UserSerializer):
    """
    Сериализатор для пользователя.
    """

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'photo']
