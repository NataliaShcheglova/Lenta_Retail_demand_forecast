from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import (IsAuthenticatedOrReadOnly)
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Categories, Forecast, Sales, Shops
from .serializers import (
    CategoriesSerializer,
    ForecastSerializer,
    SalesSerializer,
    ShopSerializer
)


class ShopViewSet(viewsets.ReadOnlyModelViewSet):
    """Представления для магазинов."""
    queryset = Shops.objects.all()
    serializer_class = ShopSerializer
    filter_backends = (DjangoFilterBackend, )
    permission_classes = [IsAuthenticatedOrReadOnly]


class ForecastViewSet(viewsets.ReadOnlyModelViewSet):
    """Представления для прогнозов."""
    http_method_names = ['get', 'post']
    queryset = Forecast.objects.all()
    serializer_class = ForecastSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CategoriesViewSet(viewsets.ReadOnlyModelViewSet):
    """Представления для категорий."""
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class SalesViewSet(viewsets.ReadOnlyModelViewSet):
    """Представления для продаж."""
    queryset = Sales.objects.all()
    serializer_class = SalesSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        date = request.query_params.get('date', None)
        context = {'date': date}
        serializer = self.get_serializer(
            self.queryset,
            many=True,
            context=context
        )
        return Response(serializer.data)
