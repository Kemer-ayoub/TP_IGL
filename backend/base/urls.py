from django.urls import path
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenRefreshView

from . import views
from .views import MyTokenObtainPairView

urlpatterns = [
    path("", views.getRoutes),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("dpi", views.dpi_list, name="dpi-create"),  # GET specific DPI
    path("dpi/<int:pk>/", views.dpi_list, name="dpi-detail"),  # GET specific DPI
    path("antecedants/", views.antecedant_list, name="antecedant-list"),
    path("examrequests/", views.examrequests_list, name="exam-requests"),
    path(
        "examrequests/<int:pk>/", views.examrequests_list, name="exam-requests-detail"
    ),  # GET specific exam request
    path("reportrequests/", views.reportrequests_list, name="report-requests"),
    path(
        "reportrequests/<int:pk>/",
        views.reportrequests_list,
        name="report-requests-detail",
    ),  # GET specific report request
    path(
        "ordonnances/<int:pk>/valider",
        views.valider_ordonnance,
        name="ordonnance-valider",
    ),  # GET specific report request
    path(
        "search-patient-nss/",
        views.get_patient_by_social_security_number,
        name="search_patient_nss",
    ),
    path(
        "add-consultation/",
        views.add_consultation,
        name="add_consultation",
    ),
    path("list-consultation/", views.list_consultation, name="list_consultation"),
    path(
        "list-consultation/<int:consultation_id>/",
        views.list_consultation,
        name="get_consultation",
    ),
    path(
        "create-ordonnance/<int:consultation_id>/",
        views.create_ordonnance_view,
        name="create_ordonnance",
    ),
    path("list-ordonnance/", views.list_ordonnance, name="list_ordonnances"),
    path(
        "list-ordonnance/<int:ordonnance_id>/",
        views.list_ordonnance,
        name="specific_ordonnance",
    ),
    path(
        "add-consultation-resume/<int:consultation_id>/",
        views.add_consultation_resume,
        name="add_consultation_resume",
    ),
    path('user_info/', views.user_info, name='user_info'),
]
