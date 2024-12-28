from django.contrib import admin

# Register your models here.
from .models import DPI, Consultation, User, Patient, PatientProfile,  Infirmier, InfirmierProfile, Radiologue, RadiologueProfile, Pharmacien, PharmacienProfile, Medecin, MedecinProfile, Laborantin, LaborantinProfile

admin.site.register(DPI)
admin.site.register(Consultation)
admin.site.register(User)
admin.site.register(Patient)
admin.site.register(PatientProfile)
admin.site.register(Infirmier)
admin.site.register(InfirmierProfile)
admin.site.register(Radiologue)
admin.site.register(RadiologueProfile)
admin.site.register(Pharmacien)
admin.site.register(PharmacienProfile)
admin.site.register(Medecin)
admin.site.register(MedecinProfile)
admin.site.register(Laborantin)
admin.site.register(LaborantinProfile)