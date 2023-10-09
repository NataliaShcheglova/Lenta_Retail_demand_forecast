from djoser.views import UserViewSet

from rest_framework.permissions import (IsAuthenticatedOrReadOnly)
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import CustomUserSerializer


class CustomUserViewSet(UserViewSet):
    """
    ViewSet для работы с пользователями.
    """
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['GET'])
    def user_info(self, request):
        user = request.user
        if user.is_authenticated:
            refresh = RefreshToken.for_user(user)
            serializer = self.get_serializer(user)
            return Response({
                'token': str(refresh.access_token),
                'user_data': serializer.data
            }, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'User is not authenticated'},
                status=status.HTTP_401_UNAUTHORIZED
            )
