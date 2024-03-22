from django.urls import path
from .views import SendRequest

urlpatterns = [
    path('', SendRequest.as_view(), name='send_request'),
    # Add more URL patterns here
]