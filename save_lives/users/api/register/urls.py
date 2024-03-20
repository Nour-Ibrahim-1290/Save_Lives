from django.urls import path
from .views import RegisterView, RegisterDonorView, RegisterReceiverView 

urlpatterns = [
    path('', RegisterView.as_view(), name='register'),
    path('donor/', RegisterDonorView.as_view(), name='donor_register'),
    path('receiver/', RegisterReceiverView.as_view(), name='receiver_register'),
]