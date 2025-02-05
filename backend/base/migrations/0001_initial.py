# Generated by Django 5.1.4 on 2025-01-28 16:59

import django.contrib.auth.models
import django.contrib.auth.validators
import django.db.models.deletion
import django.db.models.manager
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('role', models.CharField(choices=[('ADMIN', 'Admin'), ('PATIENT', 'Patient'), ('MEDECIN', 'Medecin'), ('PHARMACIEN', 'Pharmacien'), ('LABORANTIN', 'Laborantin'), ('INFIRMIER', 'Infirmier'), ('RADIOLOGUE', 'Radiologue')], max_length=50)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Infirmier',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('base.user',),
            managers=[
                ('infirmier', django.db.models.manager.Manager()),
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Laborantin',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('base.user',),
            managers=[
                ('laborantin', django.db.models.manager.Manager()),
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Medecin',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('base.user',),
            managers=[
                ('medecin', django.db.models.manager.Manager()),
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('base.user',),
            managers=[
                ('Patinet', django.db.models.manager.Manager()),
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Pharmacien',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('base.user',),
            managers=[
                ('pharmacien', django.db.models.manager.Manager()),
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Radiologue',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('base.user',),
            managers=[
                ('radiologue', django.db.models.manager.Manager()),
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='DPI',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=100)),
                ('prenom', models.CharField(max_length=100)),
                ('mot_passe', models.CharField(blank=True, max_length=255, null=True)),
                ('date_naissance', models.DateField()),
                ('adresse', models.TextField(blank=True, null=True)),
                ('telephone', models.CharField(max_length=20, null=True)),
                ('nss', models.CharField(max_length=20, unique=True)),
                ('mutuelle', models.CharField(max_length=100, null=True)),
                ('num_pers_contact', models.CharField(max_length=20, null=True)),
                ('medecin_traitant', models.OneToOneField(limit_choices_to={'role': 'MEDECIN'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='dpi_assigned', to=settings.AUTH_USER_MODEL)),
                ('patient', models.OneToOneField(limit_choices_to={'role': 'PATIENT'}, on_delete=django.db.models.deletion.CASCADE, related_name='dpi_patient', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Consultation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_cons', models.DateField()),
                ('diagnostic', models.TextField(blank=True, null=True)),
                ('resume', models.CharField(max_length=500)),
                ('medecin', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='consultations', to=settings.AUTH_USER_MODEL)),
                ('dpi', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='consultations', to='base.dpi')),
            ],
        ),
        migrations.CreateModel(
            name='BilanRadiologique',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('type_br', models.CharField(max_length=50)),
                ('description', models.TextField(blank=True, max_length=500, null=True)),
                ('observations', models.TextField(blank=True, max_length=500, null=True)),
                ('image', models.ImageField(upload_to='examens_radiologiques/')),
                ('radiologue', models.ForeignKey(limit_choices_to={'role': 'RADIOLOGUE'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='bilan_radiologiques_red', to=settings.AUTH_USER_MODEL)),
                ('dpi', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bilans_radiologiques', to='base.dpi')),
            ],
        ),
        migrations.CreateModel(
            name='BilanBiologique',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('value1', models.CharField(blank=True, max_length=50, null=True)),
                ('value2', models.CharField(blank=True, max_length=50, null=True)),
                ('value3', models.CharField(blank=True, max_length=50, null=True)),
                ('observation', models.TextField(blank=True, max_length=500, null=True)),
                ('type_bb', models.CharField(choices=[('CHOLESTEROL', 'Cholesterol'), ('IRON', 'Iron'), ('HYPERTENSION', 'Hypertension')], max_length=20)),
                ('laborantin', models.ForeignKey(limit_choices_to={'role': 'LABORANTIN'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='bilan_biologiques_lab', to=settings.AUTH_USER_MODEL)),
                ('dpi', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bilans_biologiques', to='base.dpi')),
            ],
        ),
        migrations.CreateModel(
            name='AntecedantMed',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type_record', models.CharField(choices=[('personal medical', 'Personal Medical'), ('allergie', 'Allergie'), ('medication', 'Medication'), ('vaccination', 'Vaccination')], default='personal medical', max_length=30)),
                ('name_record', models.CharField(max_length=100)),
                ('antec_date', models.DateField()),
                ('dosage', models.PositiveIntegerField(blank=True, null=True)),
                ('dpi', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='antecedanrs_medicaux', to='base.dpi')),
            ],
        ),
        migrations.CreateModel(
            name='ExamRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type_test', models.CharField(max_length=50)),
                ('subtype_test', models.CharField(max_length=50)),
                ('priority', models.CharField(choices=[('standard', 'Standard'), ('high_priority', 'High Priority'), ('urgent', 'Urgent')], default='standard', max_length=20)),
                ('medical_just', models.CharField(max_length=500)),
                ('req_date', models.DateField()),
                ('laborantin', models.ForeignKey(limit_choices_to={'role': 'LABORANTIN'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='exam_requests_lab', to=settings.AUTH_USER_MODEL)),
                ('medecin', models.ForeignKey(limit_choices_to={'role': 'MEDECIN'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='exam_requests_med', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='InfirmierProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('infirmier_id', models.IntegerField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='infirmier_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='LaborantinProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('laborantin_id', models.IntegerField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='laborantin_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MedecinProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('medecin_id', models.IntegerField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='medecin_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Ordonnance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('valid', models.BooleanField(default=False)),
                ('patient_name', models.CharField(max_length=100)),
                ('patient_age', models.IntegerField()),
                ('medecin', models.CharField(max_length=100)),
                ('consultation', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ordonnances', to='base.consultation')),
            ],
        ),
        migrations.CreateModel(
            name='Medicament',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=100)),
                ('dosage', models.PositiveIntegerField()),
                ('duree', models.CharField(max_length=100)),
                ('ordonnance', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='medicaments', to='base.ordonnance')),
            ],
        ),
        migrations.CreateModel(
            name='PatientProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('patient_id', models.IntegerField(blank=True, null=True)),
                ('admin', models.ForeignKey(limit_choices_to={'role': 'ADMIN'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='managed_patients', to=settings.AUTH_USER_MODEL)),
                ('infirmier', models.ManyToManyField(limit_choices_to={'role': 'INFIRMIER'}, related_name='patients_cared_for', to=settings.AUTH_USER_MODEL)),
                ('laborantin', models.ManyToManyField(limit_choices_to={'role': 'LABORANTIN'}, related_name='patients_tested', to=settings.AUTH_USER_MODEL)),
                ('medecins', models.ManyToManyField(limit_choices_to={'role': 'MEDECIN'}, related_name='patients_under_care', to=settings.AUTH_USER_MODEL)),
                ('pharmacien', models.ManyToManyField(limit_choices_to={'role': 'PHARMACIEN'}, related_name='patients_handled', to=settings.AUTH_USER_MODEL)),
                ('radiologue', models.ManyToManyField(limit_choices_to={'role': 'RADIOLOGUE'}, related_name='patients_imaged', to=settings.AUTH_USER_MODEL)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='patient_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PharmacienProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pharmacien_id', models.IntegerField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='pharmacien_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RadiologueProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('radiologue_id', models.IntegerField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='radiologue_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ReportRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type_test', models.CharField(max_length=50)),
                ('body_part', models.CharField(max_length=50)),
                ('priority', models.CharField(choices=[('standard', 'Standard'), ('high_priority', 'High Priority'), ('urgent', 'Urgent')], default='standard', max_length=20)),
                ('reason_req', models.CharField(max_length=500)),
                ('req_date', models.DateField()),
                ('medecin', models.ForeignKey(limit_choices_to={'role': 'MEDECIN'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='report_requests_med', to=settings.AUTH_USER_MODEL)),
                ('radiologue', models.ForeignKey(limit_choices_to={'role': 'MEDECIN'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='report_requests_rad', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Soin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('type_soin', models.CharField(choices=[('surveillance', 'Surveillance'), ('medication', 'Administration de médicaments'), ('hygiene', "Soins d'hygiène"), ('pansement', 'Changement de pansement'), ('autre', 'Autre type de soin')], max_length=50)),
                ('description_soin', models.TextField(blank=True, max_length=500, null=True)),
                ('observations', models.TextField(blank=True, max_length=500, null=True)),
                ('dpi', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='soins', to='base.dpi')),
                ('infirmier', models.ForeignKey(limit_choices_to={'role': 'INFIRMIER'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='soins', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
