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
    path('soins/', views.list_soin, name='list_soin'),  
    path('soins/<int:pk>/', views.list_soin, name='detail_soin'),  # GET a single soin by pk.
  path("add-bilan-biologique/", views.add_bilan_biologique, name="add-bilan-biologique"),
    path("add-bilan-radiologique/", views.add_bilan_radiologique, name="add-bilan-radiologique"),
     path("add-soin/", views.add_soin, name="add-soin"),

    path('bilan_biologiques/', views.list_bilan_biologique, name='list_bilan_biologique'),  
    path('bilan_biologiques/<int:pk>/', views.list_bilan_biologique, name='detail_bilan_biologique'),  # GET a single bilan biologique by pk

    path('bilan_radiologiques/', views.list_bilan_radiologique, name='list_bilan_radiologique'),  
    path('bilan_radiologiques/<int:pk>/', views.list_bilan_radiologique, name='detail_bilan_radiologique'),  # GET a single bilan radiologique by pk




    
]
