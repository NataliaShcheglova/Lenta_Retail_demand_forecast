from django.urls import include, path

from rest_framework.routers import DefaultRouter

from .views import (CategoriesViewSet,
                    ForecastViewSet,
                    SalesViewSet,
                    ShopViewSet
                    )

app_name = 'api'

router_v1 = DefaultRouter()
router_v1.register(r'shops', ShopViewSet, basename='shops')
router_v1.register(r'forecast', ForecastViewSet, basename='forecast')
router_v1.register(r'categories', CategoriesViewSet, basename='categories')
router_v1.register(r'sales', SalesViewSet, basename='sales')

urlpatterns = [
    path('v1/', include(router_v1.urls)),
]
