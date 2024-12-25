from django.contrib import admin

# Register your models here.
from .models import DPI, Consultation, User

admin.site.register(DPI)
admin.site.register(Consultation)
admin.site.register(User)