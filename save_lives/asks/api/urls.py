from django.urls import include, path
from .filter.views import Filter

urlpatterns = [
    path('filter/', include('asks.api.filter.urls')),
]