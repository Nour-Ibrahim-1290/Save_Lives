from django.urls import include, path
from .views import AlertsDonor

urlpatterns = [
    path('', AlertsDonor.as_view(), name='donor-alerts'),
]