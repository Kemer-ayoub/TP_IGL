from django.urls import path
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenRefreshView

from . import views
from .views import MyTokenObtainPairView

urlpatterns = [
    path("", views.getRoutes),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("dpi/", views.dpi_list, name="dpi-create"),  # GET specific DPI
    path("dpi-nss/", views.get_patient_nss, name="dpi-get"),  # GET specific DPI
    path("dpi/<int:pk>/", views.dpi_list, name="dpi-detail"),  # GET specific DPI
    path("user_id/", views.get_user_id, name="user-id"),  # GET specific DPI
    path("user-nom/", views.get_user_nom, name="user-nom"),  # GET specific DPI
    path("antecedants/", views.antecedant_list, name="antecedant-list"),
    path("examrequests/", views.examrequests_list, name="exam-requests"),
    path("reportrequests/", views.reportrequests_list, name="report-requests"), 
    path("valider_ordonnance/", views.valider_ordonnance, name="ordonnance-valider",),  # GET specific report request
    path('soins/', views.list_soin, name='list_soin'),  
    path("add-bilan-biologique/", views.add_bilan_biologique, name="add-bilan-biologique"),
    path("add-bilan-radiologique/", views.add_bilan_radiologique, name="add-bilan-radiologique"),
    path('bilan_biologiques/', views.list_bilan_biologique, name='list_bilan_biologique'),  
    path('bilan_biologiques/<int:pk>/', views.list_bilan_biologique, name='detail_bilan_biologique'),  # GET a single bilan biologique by pk

    path('bilan_radiologiques/', views.add_bilan_radiologique, name='list_bilan_radiologique'),  
    path('bilan_radiologiques/<int:pk>/', views.list_bilan_radiologique, name='detail_bilan_radiologique'),  # GET a single bilan radiologique by pk
    path(
        "search-patient-nss/",
        views.get_patient_by_social_security_number,
        name="search_patient_nss",
    ),
    path("consultation/", views.consultation_list, name="add_consultation"),
    path("ordonnance/", views.ordonnance_list, name="list_ordonnances"),
    path(
        "add-consultation-resume/<int:consultation_id>/",
        views.add_consultation_resume,
        name="add_consultation_resume",
    ),
    path('user_info/', views.user_info, name='user_info'),
]



