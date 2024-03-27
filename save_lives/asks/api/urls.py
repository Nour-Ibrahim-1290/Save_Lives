from django.urls import include, path
from .filter.views import Filter

urlpatterns = [
    path('filter/', include('asks.api.filter.urls')),
    path('send-request/', include('asks.api.sendreq.urls')),
    path('alerts/', include('asks.api.alert.urls')),
]