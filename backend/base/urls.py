from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework.response import Response
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('dpi/<int:pk>/', views.dpi_list, name='dpi-detail'),  # GET specific DPI
]