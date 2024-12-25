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
    path('antecedants/', views.antecedant_list, name='antecedant-list'),
    path('examrequests/', views.examrequests_list, name='exam-requests'),
    path('examrequests/<int:pk>/', views.examrequests_list, name='exam-requests-detail'),  # GET specific exam request
    path('reportrequests/', views.reportrequests_list, name='report-requests'),
    path('reportrequests/<int:pk>/', views.reportrequests_list, name='report-requests-detail'),  # GET specific report request
    path('ordonnances/<int:pk>/valider', views.valider_ordonnance, name='ordonnance-valider'),  # GET specific report request
]
