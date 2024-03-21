from django.urls import include, path
from .views import Filter

urlpatterns = [
    path('', Filter.as_view(), name='filter_donors'),
]