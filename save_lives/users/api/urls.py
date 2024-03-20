from django.urls import path
from .views import RegisterView, RegisterDonorView, RegisterReceiverView, LoginView, UpdateView, UpdateDonorView, UpdateReceiverView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('register/donor/', RegisterDonorView.as_view(), name='donor_register'),
    path('register/receiver/', RegisterReceiverView.as_view(), name='receiver_register'),
    path('update/', UpdateView.as_view(), name='update'),
    path('update/donor/', UpdateDonorView.as_view(), name='donor_update'),
    path('update/reciever/', UpdateReceiverView.as_view(), name='receiver_update'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # other paths...
]
