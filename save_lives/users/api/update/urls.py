from django.urls import path
from .views import UpdateView, UpdateDonorView, UpdateReceiverView

urlpatterns = [
    path('basic-info/', UpdateView.as_view(), name='update'),
    path('donor-info/', UpdateDonorView.as_view(), name='donor_update'),
    path('reciever-info/', UpdateReceiverView.as_view(), name='receiver_update'),
]