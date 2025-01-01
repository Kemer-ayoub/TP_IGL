from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("base.urls")),
    path("silk/", include("silk.urls", namespace="silk")),
]
