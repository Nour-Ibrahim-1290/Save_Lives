from django.urls import include, path
from .views import RegisterView, RegisterDonorView, RegisterReceiverView, LoginView, UpdateView, UpdateDonorView, UpdateReceiverView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', include('users.api.register.urls')),
    path('update/', include('users.api.update.urls')),
    path('login/', LoginView.as_view(), name='login'),


    path('token-refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
