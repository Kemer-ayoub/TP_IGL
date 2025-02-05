from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.hashers import make_password  


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

    def save(self, *args, **kwargs):  
        """Override the save method to hash password before saving."""  
        if self.password:  # Only hash if there is a password  
            self.password = make_password(self.password)  # Hash the password  
        super().save(*args, **kwargs)  # Call the parent's save method 

    def welcome(self):
        return "Only for patients"


@receiver(post_save, sender=Patient)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.role == "PATIENT":
        PatientProfile.objects.create(user=instance)


class PatientProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="patient_profile"
    )
    patient_id = models.IntegerField(null=True, blank=True)
    medecins = models.ManyToManyField(
        "User",
        limit_choices_to={"role": User.Role.MEDECIN},
        related_name="patients_under_care",
    )
    admin = models.ForeignKey(
        "User",
        on_delete=models.SET_NULL,
        limit_choices_to={"role": User.Role.ADMIN},
        null=True,
        related_name="managed_patients",
    )
    pharmacien = models.ManyToManyField(
        "User",
        limit_choices_to={"role": User.Role.PHARMACIEN},
        related_name="patients_handled",
    )
    laborantin = models.ManyToManyField(
        "User",
        limit_choices_to={"role": User.Role.LABORANTIN},
        related_name="patients_tested",
    )
    radiologue = models.ManyToManyField(
        "User",
        limit_choices_to={"role": User.Role.RADIOLOGUE},
        related_name="patients_imaged",
    )
    infirmier = models.ManyToManyField(
        "User",
        limit_choices_to={"role": User.Role.INFIRMIER},
        related_name="patients_cared_for",
    )


class PharmacienManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.PHARMACIEN)


class Pharmacien(User):

    base_role = User.Role.PHARMACIEN

    pharmacien = PharmacienManager()

    class Meta:
        proxy = True

    def save(self, *args, **kwargs):  
        """Override the save method to hash password before saving."""  
        if self.password:  # Only hash if there is a password  
            self.password = make_password(self.password)  # Hash the password  
        super().save(*args, **kwargs)  # Call the parent's save method 

    def welcome(self):
        return "Only for pharmacien"


class PharmacienProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="pharmacien_profile"
    )
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

    def save(self, *args, **kwargs):  
        """Override the save method to hash password before saving."""  
        if self.password:  # Only hash if there is a password  
            self.password = make_password(self.password)  # Hash the password  
        super().save(*args, **kwargs)  # Call the parent's save method 

    def welcome(self):
        return "Only for medecins"


class MedecinProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="medecin_profile"
    )
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

    def save(self, *args, **kwargs):  
        """Override the save method to hash password before saving."""  
        if self.password:  # Only hash if there is a password  
            self.password = make_password(self.password)  # Hash the password  
        super().save(*args, **kwargs)  # Call the parent's save method 

    def welcome(self):
        return "Only for Laborantins"


class LaborantinProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="laborantin_profile"
    )
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

    def save(self, *args, **kwargs):  
        """Override the save method to hash password before saving."""  
        if self.password:  # Only hash if there is a password  
            self.password = make_password(self.password)  # Hash the password  
        super().save(*args, **kwargs)  # Call the parent's save method 

    def welcome(self):
        return "Only for Infirmiers"


class InfirmierProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="infirmier_profile"
    )
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

    def save(self, *args, **kwargs):  
        """Override the save method to hash password before saving."""  
        if self.password:  # Only hash if there is a password  
            self.password = make_password(self.password)  # Hash the password  
        super().save(*args, **kwargs)  # Call the parent's save method 

    def welcome(self):
        return "Only for RadiologueS"


class RadiologueProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="radiologue_profile"
    )
    radiologue_id = models.IntegerField(null=True, blank=True)


@receiver(post_save, sender=Radiologue)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.role == "RADIOLOGUE":
        RadiologueProfile.objects.create(user=instance)


# Entity Models:
class DPI(models.Model):
    # Est que ndir dpi_id??
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    mot_passe = models.CharField(max_length=255, null=True, blank=True)
    date_naissance = models.DateField()
    adresse = models.TextField(null=True, blank=True)
    telephone = models.CharField(max_length=20, null=True)
    nss = models.CharField(max_length=20, unique=True)  # Numéro de Sécurité Sociale
    mutuelle = models.CharField(max_length=100, null=True)
    num_pers_contact = models.CharField(max_length=20, null=True)
    # protocol = models.CharField(max_length=255, null=True, blank=True)
    medecin_traitant = models.OneToOneField(
        User,
        on_delete=models.SET_NULL,
        limit_choices_to={"role": User.Role.MEDECIN},
        null=True,
        related_name="dpi_assigned",
    )  # Optional: Limit to only Medecin users #Se change par le temps
    patient = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={"role": User.Role.PATIENT}, related_name="dpi_patient")
    # le QR code
    objects = models.Manager()

    def __str__(self):
        return self.nom


class Consultation(models.Model):
    medecin = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="consultations"
    )
    date_cons = models.DateField()
    diagnostic = models.TextField(null=True, blank=True)
    resume = models.CharField(max_length=500)
    # ordonnance = models.OneToOneField('Ordonnance', on_delete=models.SET_NULL, null=True, related_name="consultation")
    dpi = models.ForeignKey(DPI, on_delete=models.CASCADE, related_name="consultations")

    objects = models.Manager()

    def __str__(self):
        return f"Consultation le {self.date_cons}"


class Ordonnance(models.Model):
    valid = models.BooleanField(default=False)  # ca sera validé par le pharmacie
    consultation = models.ForeignKey(
        Consultation, 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name="ordonnances"
    )
    patient_name = models.CharField(max_length=100)
    patient_age = models.IntegerField()
    medecin = models.CharField(max_length=100)

    def __str__(self):
        return f"Ordonnance for {self.patient_name}"



class Soin(models.Model):
    infirmier = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        limit_choices_to={"role": User.Role.INFIRMIER},
        null=True,
        related_name="soins",
    )
    dpi = models.ForeignKey(DPI, on_delete=models.CASCADE, related_name="soins")
    date = models.DateField()
    time = models.TimeField()
    # Types de soins
    TYPES_SOINS = [
        ("surveillance", "Surveillance"),
        ("medication", "Administration de médicaments"),
        ("hygiene", "Soins d'hygiène"),
        ("pansement", "Changement de pansement"),
        ("autre", "Autre type de soin"),
    ]

    # Détails du soin
    type_soin = models.CharField(max_length=50, choices=TYPES_SOINS)
    description_soin = models.TextField(max_length=500, null=True, blank=True)
    # help_text="Description détaillée du soin prodigué"

    # Observations générales
    observations = models.TextField(max_length=500, blank=True, null=True)


class Medicament(models.Model):
    nom = models.CharField(max_length=100)
    dosage = models.PositiveIntegerField()
    duree = models.CharField(max_length=100)
    ordonnance = models.ForeignKey(
        Ordonnance, on_delete=models.CASCADE, null=True, related_name="medicaments"
    )
    """soin = models.ForeignKey(
        Soin, on_delete=models.CASCADE, null=True, related_name="medicaments"
    )"""

    def __str__(self):
        return self.nom


class BilanRadiologique(models.Model):
    radiologue = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        limit_choices_to={"role": User.Role.RADIOLOGUE},
        null=True,
        related_name="bilan_radiologiques_red",
    )
    """medecin = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        limit_choices_to={"role": User.Role.MEDECIN},
        null=True,
        related_name="bilan_radiologiques_med",
    )"""
    dpi = models.ForeignKey(
        DPI, on_delete=models.CASCADE, related_name="bilans_radiologiques"
    )
    date = models.DateField()
    time = models.TimeField()
    type_br = models.CharField(max_length=50)
    description = models.TextField(max_length=500, null=True, blank=True)
    # help_text="Description détaillée du soin prodigué"

    # Observations générales
    observations = models.TextField(max_length=500, blank=True, null=True)
    # Image principale de l'examen
    image = models.ImageField(upload_to="examens_radiologiques/")

    def __str__(self):
        return self.type_br


class BilanBiologique(models.Model):
    laborantin = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        limit_choices_to={"role": User.Role.LABORANTIN},
        null=True,
        related_name="bilan_biologiques_lab",
    )
    """medecin = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        limit_choices_to={"role": User.Role.MEDECIN},
        null=True,
        related_name="bilan_biologiques_med",
    )"""
    date = models.DateField()
    value1 = models.CharField(max_length=50, blank=True, null=True)
    value2 = models.CharField(max_length=50, blank=True, null=True)
    value3 = models.CharField(max_length=50, blank=True, null=True)    
    observation = models.TextField(max_length=500, blank=True, null=True)

    dpi = models.ForeignKey(
        DPI, on_delete=models.CASCADE, related_name="bilans_biologiques"
    )
    type_bb = models.CharField(
        max_length=20,
        choices = [
        ("CHOLESTEROL", "Cholesterol"),
        ("IRON", "Iron"),
        ("HYPERTENSION", "Hypertension"),
        ]
    )

    def __str__(self):
        return self.statut


class ExamRequest(models.Model):  # Request le bilan biologique
    type_test = models.CharField(max_length=50)
    subtype_test = models.CharField(max_length=50)

    PRIORITY_CHOICES = [
        ("standard", "Standard"),
        ("high_priority", "High Priority"),
        ("urgent", "Urgent"),
    ]

    priority = models.CharField(
        max_length=20, choices=PRIORITY_CHOICES, default="standard"
    )
    medical_just = models.CharField(max_length=500)
    req_date = models.DateField()
    medecin = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        limit_choices_to={"role": User.Role.MEDECIN},
        related_name="exam_requests_med",
    )
    laborantin = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        limit_choices_to={"role": User.Role.LABORANTIN},
        related_name="exam_requests_lab",
    )

    def __str__(self):
        return self.type_test


class ReportRequest(models.Model):  # Request le bilan biologique
    type_test = models.CharField(max_length=50)
    body_part = models.CharField(max_length=50)

    PRIORITY_CHOICES = [
        ("standard", "Standard"),
        ("high_priority", "High Priority"),
        ("urgent", "Urgent"),
    ]

    priority = models.CharField(
        max_length=20, choices=PRIORITY_CHOICES, default="standard"
    )
    reason_req = models.CharField(max_length=500)
    req_date = models.DateField()
    medecin = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        limit_choices_to={"role": User.Role.MEDECIN},
        related_name="report_requests_med",
    )
    radiologue = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        limit_choices_to={"role": User.Role.MEDECIN},
        related_name="report_requests_rad",
    )

    def __str__(self):
        return self.type_test


class AntecedantMed(models.Model):
    RECORDS_TYPES = [
        ("personal medical", "Personal Medical"),
        ("allergie", "Allergie"),
        ("medication", "Medication"),
        ("vaccination", "Vaccination"),
    ]

    type_record = models.CharField(
        max_length=30, choices=RECORDS_TYPES, default="personal medical"
    )
    name_record = models.CharField(max_length=100)
    antec_date = models.DateField()
    dosage = models.PositiveIntegerField(null=True, blank=True)
    dpi = models.ForeignKey(
        DPI, on_delete=models.CASCADE, null=True, related_name="antecedanrs_medicaux"
    )

    def __str__(self):
        return self.type_record
