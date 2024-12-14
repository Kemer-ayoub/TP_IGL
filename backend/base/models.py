from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import MinValueValidator, MaxValueValidator


# Users Models:
class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        PATIENT = "PATIENT", "Patient"
        MEDECIN = "MEDECIN", "Medecin"
        PHARMACIEN = "PHARMACIEN", "Pharmacien"
        LABORANTIN = "LABORANTIN", "Laborantin"
        INFIRMIER = "INFIRMIER", "Infirmier"
        RADIOLOGUE = "RADIOLOGUE", "Radiologue"
    
    base_role = Role.ADMIN

    role = models.CharField(max_length=50, choices=Role.choices)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.role = self.base_role
            return super().save(*args, **kwargs)

class PatientManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.PATIENT)
        
class Patient(User):

    base_role = User.Role.PATIENT

    Patinet = PatientManager()

    class Meta:
        proxy = True

    def welcome(self):
        return "Only for patients"
    
@receiver(post_save, sender=Patient)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.role == "PATIENT":
        PatientProfile.objects.create(user=instance)
    
class PatientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="patient_profile")
    patient_id = models.IntegerField(null=True, blank=True)
    medecin_traitant = models.ForeignKey('User', on_delete=models.SET_NULL, limit_choices_to={'role': User.Role.MEDECIN}, null=True, related_name="patients_under_care")
    admin = models.ForeignKey('User', on_delete=models.SET_NULL, limit_choices_to={'role': User.Role.ADMIN}, null=True, related_name="managed_patients")
    pharmacien = models.ManyToManyField('User', limit_choices_to={'role': User.Role.PHARMACIEN}, related_name="patients_handled")
    laborantin = models.ManyToManyField('User', limit_choices_to={'role': User.Role.LABORANTIN}, related_name="patients_tested")
    radiologue = models.ManyToManyField('User', limit_choices_to={'role': User.Role.RADIOLOGUE}, related_name="patients_imaged")
    infirmier = models.ManyToManyField('User', limit_choices_to={'role': User.Role.INFIRMIER}, related_name="patients_cared_for")

class PharmacienManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.PHARMACIEN)

class Pharmacien(User):

    base_role = User.Role.PHARMACIEN

    pharmacien = PharmacienManager()

    class Meta:
        proxy = True

    def welcome(self):
        return "Only for pharmacien"
    
class PharmacienProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="pharmacien_profile")
    pharmacien_id = models.IntegerField(null=True, blank=True)

@receiver(post_save, sender=Pharmacien)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.role == "PHARMACIEN":
        PharmacienProfile.objects.create(user=instance)


class MedecinManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.MEDECIN)

class Medecin(User):

    base_role = User.Role.MEDECIN

    medecin = MedecinManager()

    class Meta:
        proxy = True

    def welcome(self):
        return "Only for medecins"
    
class MedecinProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="medecin_profile")
    medecin_id = models.IntegerField(null=True, blank=True)

@receiver(post_save, sender=Medecin)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.role == "MEDECIN":
        MedecinProfile.objects.create(user=instance)

class LaborantinManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.LABORANTIN)

class Laborantin(User):

    base_role = User.Role.LABORANTIN

    laborantin = LaborantinManager()

    class Meta:
        proxy = True

    def welcome(self):
        return "Only for Laborantins"
    
class LaborantinProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="laborantin_profile")
    laborantin_id = models.IntegerField(null=True, blank=True)

@receiver(post_save, sender=Laborantin)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.role == "LABORANTIN":
        LaborantinProfile.objects.create(user=instance)


class InfirmierManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.INFIRMIER)

class Infirmier(User):

    base_role = User.Role.INFIRMIER

    infirmier = InfirmierManager()

    class Meta:
        proxy = True

    def welcome(self):
        return "Only for Infirmiers"
    
class InfirmierProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="infirmier_profile")
    infirmier_id = models.IntegerField(null=True, blank=True)

@receiver(post_save, sender=Infirmier)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.role == "INFIRMIER":
        InfirmierProfile.objects.create(user=instance)


class RadiologueManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.RADIOLOGUE)

class Radiologue(User):

    base_role = User.Role.RADIOLOGUE

    radiologue = RadiologueManager()

    class Meta:
        proxy = True

    def welcome(self):
        return "Only for RadiologueS"
    
class RadiologueProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="radiologue_profile")
    radiologue_id = models.IntegerField(null=True, blank=True)

@receiver(post_save, sender=Radiologue)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.role == "RADIOLOGUE":
        RadiologueProfile.objects.create(user=instance)


#Entity Models:
class DPI(models.Model):
    #Est que ndir dpi_id??
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    mot_passe = models.CharField(max_length=255)
    date_naissance = models.DateField()
    adresse = models.TextField(null=True, blank=True)
    telephone = models.CharField(max_length=20, null=True)
    nss = models.CharField(max_length=20, unique=True)  # Numéro de Sécurité Sociale
    mutuelle = models.CharField(max_length=100, null=True)
    num_pers_contact = models.CharField(max_length=20, null=True)
    #protocol = models.CharField(max_length=255, null=True, blank=True)
    medecin_traitant = models.OneToOneField(User, on_delete=models.SET_NULL, limit_choices_to={'role': User.Role.MEDECIN}, null=True,  related_name="dpi_assigned")# Optional: Limit to only Medecin users #Se change par le temps
    patient = models.OneToOneField(User, on_delete=models.CASCADE)
    #le QR code

    def __str__(self):
        return self.nom

class Consultation(models.Model):
    medecin = models.ForeignKey(Medecin, on_delete=models.SET_NULL, null=True, related_name="consultations")
    date_cons = models.DateField()
    #diagnostic = models.TextField(null=True, blank=True)
    ordonnance = models.OneToOneField('Ordonnance', on_delete=models.SET_NULL, null=True, related_name="consultation")
    dpi = models.ForeignKey(DPI, on_delete=models.CASCADE, related_name="consultations")

    def __str__(self):
        return f"Consultation de {self.patient.prenom} {self.patient.nom} le {self.date_cons}"

class Resume(models.Model):
    resume = models.CharField(max_length=1000)
    consultation = models.OneToOneField('Consultation', on_delete=models.SET_NULL, null=True, related_name="resume_details")

    def __str__(self):
        return self.resume

class Ordonnance(models.Model):
    date = models.DateField()

    def __str__(self):
        return self.date

class Soin(models.Model):
    infirmier = models.ForeignKey(User, on_delete=models.SET_NULL , limit_choices_to={'role': User.Role.INFIRMIER}, null=True, related_name="soins")
    dpi = models.ForeignKey(DPI, on_delete=models.CASCADE, related_name="soins")
    # Types de soins
    TYPES_SOINS = [
        ('surveillance', 'Surveillance'),
        ('medication', 'Administration de médicaments'),
        ('hygiene', 'Soins d\'hygiène'),
        ('pansement', 'Changement de pansement'),
        ('autre', 'Autre type de soin')
    ]
    
    # Détails du soin
    type_soin = models.CharField(max_length=50, choices=TYPES_SOINS)
    description_soin = models.TextField(help_text="Description détaillée du soin prodigué")

    # Observations cliniques
    NIVEAUX_GRAVITE = [
        ('normal', 'Normal'),
        ('vigilance', 'Nécessite une vigilance'),
        ('urgent', 'Intervention urgente requise')
    ]
    
    temperature = models.DecimalField(
        max_digits=4, 
        decimal_places=1, 
        null=True, 
        blank=True,
        validators=[
            MinValueValidator(30.0),
            MaxValueValidator(42.0)
        ]
    )
    tension_arterielle_systolique = models.PositiveSmallIntegerField(
        null=True, 
        blank=True,
        validators=[
            MinValueValidator(50),
            MaxValueValidator(250)
        ]
    )
    tension_arterielle_diastolique = models.PositiveSmallIntegerField(
        null=True, 
        blank=True,
        validators=[
            MinValueValidator(30),
            MaxValueValidator(150)
        ]
    )
    frequence_cardiaque = models.PositiveSmallIntegerField(
        null=True, 
        blank=True,
        validators=[
            MinValueValidator(30),
            MaxValueValidator(200)
        ]
    )
    
    # Observations générales
    observations_generales = models.TextField(
        blank=True, 
        null=True
    )
    niveau_gravite = models.CharField(
        max_length=20, 
        choices=NIVEAUX_GRAVITE, 
        default='normal'
    )

class Medicament(models.Model):
    nom = models.CharField(max_length=100)
    dosage = models.IntegerField()
    duree = models.CharField(max_length=100)
    ordonnance = models.ForeignKey(Ordonnance, on_delete=models.CASCADE, null=True, related_name="medicaments")
    soin = models.ForeignKey(Soin, on_delete=models.CASCADE, null=True, related_name="medicaments")

    def __str__(self):
        return self.nom

class Bilan(models.Model):
    medecin = models.ForeignKey(User, on_delete=models.SET_NULL , limit_choices_to={'role': User.Role.MEDECIN}, null=True)
    dpi = models.ForeignKey(DPI, on_delete=models.CASCADE)
    #patient

    class Meta:
        # This marks the model as abstract
        abstract = True

class BilanRadiologique(Bilan):
    radiologue = models.ForeignKey(User, on_delete=models.SET_NULL, limit_choices_to={'role': User.Role.RADIOLOGUE}, null=True, related_name="bilan_radiologiques")
    compte_rendu = models.TextField()
    statut = models.CharField(
        max_length=20, 
        choices=[
            ('EN_ATTENTE', 'En attente'),
            ('TERMINE', 'Terminé'),
            ('URGENT', 'Urgent')
        ]
    )
    radio = models.CharField(max_length=100)  # IRM, Scanner, Radiographie
    # Image principale de l'examen
    image_principale = models.ImageField(upload_to='examens_radiologiques/')
    
    # Fichiers supplémentaires (comptes-rendus, autres images, etc.)
    images_supplementaires = models.FileField(
        upload_to='examens_radiologiques/supplementaires/', 
        null=True, 
        blank=True
    )

    def __str__(self):
        return self.radio

class BilanBiologique(Bilan):
    laborantin = models.OneToOneField(User, on_delete=models.SET_NULL, limit_choices_to={'role': User.Role.LABORANTIN}, null=True, related_name="bilan_biologique")
    statut = models.CharField(
        max_length=20, 
        choices=[
            ('EN_ATTENTE', 'En attente'),
            ('TERMINE', 'Terminé'),
            ('URGENT', 'Urgent')
        ]
    )

    def __str__(self):
        return self.status


