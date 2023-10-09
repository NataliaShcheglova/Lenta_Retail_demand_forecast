from django.contrib import admin

from .models import Categories, Forecast, Sales, Shops


@admin.register(Shops)
class ShopAdmin(admin.ModelAdmin):
    list_display = (
        'store', 'city', 'division',
        'type_format', 'loc', 'size', 'is_active'
    )
    search_fields = ('store', 'city', 'division',)
    list_filter = (
        'store', 'city', 'division',
        'type_format', 'loc', 'size', 'is_active'
    )
    empty_value_display = '-пусто-'


@admin.register(Forecast)
class ForecastAdmin(admin.ModelAdmin):
    list_display = ('store', 'forecast_date')
    search_fields = ('store', 'forecast_date')
    list_filter = ('store', 'forecast_date')
    empty_value_display = '-пусто-'


@admin.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
    list_display = ('id', 'group', 'category', 'subcategory', 'sku', 'uom')
    list_filter = ('group', 'category', 'subcategory', 'sku',)


@admin.register(Sales)
class SalesAdmin(admin.ModelAdmin):
    list_display = ('id', 'store', 'sku',
                    'sales_type', 'sales_units',
                    'sales_units_promo', 'sales_rub',
                    'sales_run_promo'
                    )
    list_filter = ('store', 'sku',)
