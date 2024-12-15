from rest_framework import serializers
from .models import  User, Patient, PatientProfile, Pharmacien, PharmacienProfile, Medecin, MedecinProfile, Laborantin, LaborantinProfile, Infirmier, InfirmierProfile, Radiologue, RadiologueProfile, Consultation, Resume, Soin, Ordonnance, Medicament, BilanBiologique, BilanRadiologique, DPI, ExamRequest, ReportRequest

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'first_name', 'last_name', 'role']
        read_only_fields = ['id']  # The ID cannot be manually set

class PatientProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) #To get the other(principal) informations
#Pour le moment on est besoin seulement des details sur le patient et pas les autres champ. Aprés si on voulait ici on trouve la representation
    #medecin_traitant = UserSerializer(read_only=True)
    #admin = UserSerializer(read_only=True)
    #pharmacien = UserSerializer(many=True, read_only=True)
    #laborantin = UserSerializer(many=True, read_only=True)
    #radiologue = UserSerializer(many=True, read_only=True)
    #infirmier = UserSerializer(many=True, read_only=True)

    class Meta:
        model = PatientProfile
        fields = '__all__'

class PharmacienProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = PharmacienProfile
        fields = '__all__'

class MedecinProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = MedecinProfile
        fields = '__all__'

class LaborantinProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = LaborantinProfile
        fields = '__all__'

class InfirmierProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = InfirmierProfile
        fields = '__all__'

class RadiologueProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = RadiologueProfile
        fields = '__all__'

class DPISerializer(serializers.ModelSerializer):
    patient = UserSerializer(read_only=True)
    medecin_traitant = UserSerializer(read_only=True)

    class Meta:
        model = DPI
        fields = '__all__'

class ConsultationSerializer(serializers.ModelSerializer):
    medecin = UserSerializer(read_only=True)
    dpi = DPISerializer(read_only=True)

    class Meta:
        model = Consultation
        fields = '__all__'

class ResumeSerializer(serializers.ModelSerializer):
    consultation = ConsultationSerializer(read_only=True)

    class Meta:
        model = Resume
        fields = '__all__'

class OrdonnanceSerializer(serializers.ModelSerializer):
    medicaments = serializers.SerializerMethodField()

    class Meta:
        model = Ordonnance
        fields = '__all__'

    def get_medicaments(self, obj):
        return MedicamentSerializer(obj.medicaments.all(), many=True).data

class SoinSerializer(serializers.ModelSerializer):
    infirmier = UserSerializer(read_only=True)
    dpi = DPISerializer(read_only=True)
    medicaments = serializers.SerializerMethodField()

    class Meta:
        model = Soin
        fields = '__all__'

    def get_medicaments(self, obj):
        return MedicamentSerializer(obj.medicaments.all(), many=True).data

class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = '__all__'

class BilanRadiologiqueSerializer(serializers.ModelSerializer):
    medecin = UserSerializer(read_only=True)
    dpi = DPISerializer(read_only=True)
    radiologue = UserSerializer(read_only=True)

    class Meta:
        model = BilanRadiologique
        fields = '__all__'

class BilanBiologiqueSerializer(serializers.ModelSerializer):
    medecin = UserSerializer(read_only=True)
    dpi = DPISerializer(read_only=True)
    laborantin = UserSerializer(read_only=True)

    class Meta:
        model = BilanBiologique
        fields = '__all__'

class ExamRequestSerializer(serializers.ModelSerializer):
    medecin = UserSerializer(read_only=True)
    laborantin = UserSerializer(read_only=True)

    class Meta:
        model = ExamRequest
        fields = '__all__'

class ReportRequestSerializer(serializers.ModelSerializer):
    medecin = UserSerializer(read_only=True)
    radiologue = UserSerializer(read_only=True)

    class Meta:
        model = ReportRequest
        fields = '__all__'