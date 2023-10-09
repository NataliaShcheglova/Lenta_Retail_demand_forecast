from rest_framework import serializers

from .models import Categories, Forecast, Sales, Shops


class ShopSerializer(serializers.ModelSerializer):
    """Сериализатор для магазинов."""
    class Meta:
        model = Shops
        fields = '__all__'


class ForecastSerializer(serializers.ModelSerializer):
    """Сериализатор для прогнозов."""
    forecast = serializers.JSONField()

    class Meta:
        model = Forecast
        fields = '__all__'


class CategoriesSerializer(serializers.ModelSerializer):
    sku = serializers.CharField()
    group = serializers.CharField()
    category = serializers.CharField()
    subcategory = serializers.CharField()
    uom = serializers.IntegerField()

    class Meta:
        model = Categories
        fields = '__all__'
        read_only_fields = '__all__',


class SalesFactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sales
        fields = ['date', 'sales_type', 'sales_units',
                  'sales_units_promo', 'sales_rub',
                  'sales_run_promo'
                  ]


class SalesSerializer(serializers.ModelSerializer):
    fact = serializers.SerializerMethodField()

    class Meta:
        model = Sales
        fields = ('store', 'sku', 'fact')

    def get_fact(self, obj):
        date = self.context.get('date', None)
        sales_data = Sales.objects.filter(store=obj.store, sku=obj.sku)
        if date:
            sales_data = sales_data.filter(date=date)

        fact_data = SalesFactSerializer(sales_data, many=True).data
        return fact_data
