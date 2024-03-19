from django.urls import path
from .views import RegisterView, RegisterDonorView, RegisterReceiverView, LoginView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('register/donor/', RegisterDonorView.as_view(), name='donor_register'),
    path('register/receiver/', RegisterReceiverView.as_view(), name='receiver_register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # other paths...
]
