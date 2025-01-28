from django.contrib import admin
<<<<<<< HEAD
from django.urls import include, path, re_path 
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
    openapi.Info(
        title="Your API Title",
        default_version='v1',
        description="API documentation for your project",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="ma_kemer@esi.dz"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)
=======
from django.urls import include, path
>>>>>>> 1109aeef4c2c5a93517dd75840f96155dc960e5b

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("base.urls")),
    path("silk/", include("silk.urls", namespace="silk")),
<<<<<<< HEAD

    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
=======
>>>>>>> 1109aeef4c2c5a93517dd75840f96155dc960e5b
]
