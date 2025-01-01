
import json

from django.http import HttpResponseNotFound, JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model

from .models import *
from .serializers import DPISerializer, AntecedantMedSerializer, ExamRequestSerializer, ReportRequestSerializer, OrdonnanceSerializer,BilanBiologiqueSerializer,BilanRadiologiqueSerializer,SoinSerializer, UserSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims to the token
        token["username"] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def getRoutes(request):
    routes = [
        "/api/token",
        "/api/token/refresh",
    ]

    return Response(routes)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def dpi_list(request, pk=None, format=None):
    if request.method == "GET":
        if pk is not None:
            # Retrieve a specific DPI by ID
            dpi = get_object_or_404(DPI, patient=pk)
            serializer = DPISerializer(dpi)
            return Response(serializer.data)

    if request.method == "POST":
        print("Adele Canon Romania",request.data)
        mapped_data = {
        "nom": request.data.get("nom", ""),  # Maps 'firstName' to 'prenom'
        "prenom": request.data.get("prenom", ""),   # Maps 'familyName' to 'nom'
        "mot_passe": request.data.get("mot_passe"),
        "date_naissance": request.data.get("date_naissance", "2000-01-01"),  # Maps 'dob' to 'date_naissance'
        "adresse": request.data.get("adresse", ""),
        "telephone": request.data.get("telephone", ""),
        "nss": request.data.get("nss", ""),          # Maps 'ssn' to 'nss'
        "mutuelle": request.data.get("mutuelle", "adhesion"),          # Maps 'ssn' to 'nss'
        "num_pers_contact": request.data.get("num_pers_contact", ""),
        "medecin_traitant": request.data.get("medecin_traitant", None),
        "patient": request.data.get("patient", None),
        }
        print("Adele Canon16",mapped_data)
        serializer = DPISerializer(data=mapped_data)
        print("this is the end")
        if serializer.is_valid():
            print("hold your breath")
            print('serialier', serializer)
            serializer.save()
            print("and count to 10")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_id(request):
    nom = request.GET.get('nom')
    if request.method == "GET":
        if nom:
            # Get specific antecedant
            user = get_object_or_404(User, first_name=nom)
            serializer = UserSerializer(user)
            return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_nom(request, pk=None, format=None):
    id = request.GET.get('id')
    if request.method == "GET":
        if id:
            # Get specific antecedant
            user = get_object_or_404(User, id=id)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_patient_nss(request):
    nss = request.GET.get('nss')
    if request.method == "GET":
        if nss:
            # Get specific antecedant
            dpi = get_object_or_404(DPI, nss=nss)
            serializer = DPISerializer(dpi)
            return Response(serializer.data)

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def antecedant_list(request):
    if request.method == "GET":
        dpi = request.GET.get('dpi')
        # Filter antecedants by the specific dpi_id
        antecedants = AntecedantMed.objects.filter(dpi__id=dpi)
        serializer = AntecedantMedSerializer(antecedants, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = AntecedantMedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def examrequests_list(request, pk=None):
    if request.method == "GET":
        if pk is not None:
            # Get specific antecedant
            exam_request = get_object_or_404(ExamRequest, pk=pk)
            serializer = ExamRequestSerializer(exam_request)
            return Response(serializer.data)

        # Get all antecedants
        exam_requests = ExamRequest.objects.all()
        serializer = ExamRequestSerializer(exam_requests, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = ExamRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def reportrequests_list(request, pk=None):
    if request.method == "GET":
        if pk is not None:
            # Get specific antecedant
            report_request = get_object_or_404(ReportRequest, pk=pk)
            serializer = ReportRequestSerializer(report_request)
            return Response(serializer.data)

        # Get all antecedants
        report_requests = ReportRequest.objects.all()
        serializer = ReportRequestSerializer(report_requests, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = ReportRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def valider_ordonnance(request, pk):
    try:
        item = Ordonnance.objects.get(pk=pk)
    except Ordonnance.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = OrdonnanceSerializer(item, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_soin(request):
    serializer = SoinSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_soin(request, pk=None):
    if pk is not None:
        soin = get_object_or_404(Soin, pk=pk)
        serializer = SoinSerializer(soin)
        return Response(serializer.data)
    soins = Soin.objects.all()
    serializer = SoinSerializer(soins, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_bilan_biologique(request):
    serializer = BilanBiologiqueSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_bilan_biologique(request, pk=None):
    if pk is not None:
        bilan = get_object_or_404(BilanBiologique, pk=pk)
        serializer = BilanBiologiqueSerializer(bilan)
        return Response(serializer.data)
    bilans = BilanBiologique.objects.all()
    serializer = BilanBiologiqueSerializer(bilans, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_bilan_radiologique(request):
    serializer = BilanRadiologiqueSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_bilan_radiologique(request, pk=None):
    if pk is not None:
        bilan = get_object_or_404(BilanRadiologique, pk=pk)
        serializer = BilanRadiologiqueSerializer(bilan)
        return Response(serializer.data)
    bilans = BilanRadiologique.objects.all()
    serializer = BilanRadiologiqueSerializer(bilans, many=True)
    return Response(serializer.data)

@csrf_exempt
def get_patient_by_social_security_number(request):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

    try:
        body = json.loads(request.body)
        nss = body.get("nss")
        if not nss:
            return JsonResponse({"error": "Missing parameter: nss"}, status=400)

        # Search for DPI by nss
        dpi = DPI.objects.filter(nss=nss).first()

        if dpi is None:
            return JsonResponse({"error": "DPI not found"}, status=404)

        # Return relevant DPI data in JSON format
        data = {
            "nom": dpi.nom,
            "prenom": dpi.prenom,
            "date_naissance": dpi.date_naissance,
            "adresse": dpi.adresse,
            "telephone": dpi.telephone,
            "nss": dpi.nss,
            "mutuelle": dpi.mutuelle,
            "num_pers_contact": dpi.num_pers_contact,
            "medecin_traitant": (
                dpi.medecin_traitant.id if dpi.medecin_traitant else None
            ),  # Medecin ID or None
            "patient": dpi.patient.id,  # Patient ID
        }
        return JsonResponse(data)

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON format"}, status=400)


@csrf_exempt
def add_consultation(request):
    if request.method == "POST":
        try:
            # Get data from the request body (assuming it's JSON)
            data = json.loads(request.body)
            dpi_id = data.get("dpi_id")
            medecin_id = data.get("medecin_id")
            date_cons = data.get("date_cons")
            diagnostic = data.get("diagnostic")
            resume = data.get("resume")

            if not dpi_id or not medecin_id or not date_cons or not resume:
                return JsonResponse({"error": "Missing required fields."}, status=400)

            get_object_or_404(User, role="MEDECIN").objects.filter(id=medecin_id)
            get_object_or_404(DPI).objects.filter(id=dpi_id)

            # Validate the date format and convert to date
            try:
                date_cons = datetime.strptime(date_cons, "%Y-%m-%d").date()
            except ValueError:
                return JsonResponse(
                    {"error": "Invalid date format. Use YYYY-MM-DD."}, status=400
                )

            # Create the Consultation instance
            consultation = Consultation(
                medecin=medecin.user,  # Set the medecin field as the User associated with the Medecin
                date_cons=date_cons,
                diagnostic=diagnostic,
                resume=resume,
                dpi=dpi,
            )
            consultation.save()

            return JsonResponse(
                {"message": "Consultation added successfully."}, status=201
            )

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)

    return JsonResponse({"error": "Invalid HTTP method. Use POST."}, status=405)


def list_consultation(request, consultation_id=None):
    """
    Returns a list of consultations or a specific consultation by its ID.
    """
    if consultation_id:
        # Fetch a specific consultation by ID
        try:
            consultation = Consultation.objects.get(id=consultation_id)
            data = {
                "id": consultation.id,
                "medecin": (
                    consultation.medecin.username if consultation.medecin else None
                ),
                "date_cons": consultation.date_cons,
                "diagnostic": consultation.diagnostic,
                "resume": consultation.resume,
                "dpi": consultation.dpi.nom + " " + consultation.dpi.prenom,
            }
            return JsonResponse(data, safe=False)
        except Consultation.DoesNotExist:
            return HttpResponseNotFound("Consultation not found.")
    else:
        # Fetch all consultations
        consultations = Consultation.objects.all()
        data = [
            {
                "id": cons.id,
                "medecin": cons.medecin.username if cons.medecin else None,
                "date_cons": cons.date_cons,
                "diagnostic": cons.diagnostic,
                "resume": cons.resume,
                "dpi": cons.dpi.nom + " " + cons.dpi.prenom,
            }
            for cons in consultations
        ]
        return JsonResponse(data, safe=False)


@csrf_exempt
def create_ordonnance_view(request, consultation_id):
    if request.method == "POST":
        try:
            # Fetch the consultation
            consultation = get_object_or_404(Consultation, id=consultation_id)

            # Parse medications from the request body
            medications = request.POST.get("medications")
            if not medications:
                return JsonResponse({"error": "No medications provided."}, status=400)

            # Convert medications string to list of dictionaries
            import json

            medications = json.loads(medications)

            # Create the Ordonnance
            ordonnance = Ordonnance.objects.create(
                date=date.today(), valid=False, consultation=consultation
            )

            # Add medications to the Ordonnance
            for med in medications:
                Medicament.objects.create(
                    nom=med["name"],
                    dosage=med["dosage"],
                    duree=med["duration"],
                    ordonnance=ordonnance,
                )

            return JsonResponse(
                {
                    "message": "Ordonnance created successfully.",
                    "ordonnance_id": ordonnance.id,
                }
            )

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid HTTP method. Use POST."}, status=405)


@csrf_exempt
def list_ordonnance(request, ordonnance_id=None):
    try:
        if ordonnance_id:
            # Retrieve a specific ordonnance
            ordonnance = get_object_or_404(Ordonnance, id=ordonnance_id)
            medications = ordonnance.medicament_set.all()
            ordonnance_data = {
                "id": ordonnance.id,
                "date": ordonnance.date,
                "valid": ordonnance.valid,
                "consultation_id": (
                    ordonnance.consultation.id if ordonnance.consultation else None
                ),
                "medications": [
                    {
                        "name": med.nom,
                        "dosage": med.dosage,
                        "duration": med.duree,
                    }
                    for med in medications
                ],
            }
            return JsonResponse(ordonnance_data)
        else:
            # Retrieve all ordonnances
            ordonnances = Ordonnance.objects.all()
            ordonnances_list = [
                {
                    "id": ordonnance.id,
                    "date": ordonnance.date,
                    "valid": ordonnance.valid,
                    "consultation_id": (
                        ordonnance.consultation.id if ordonnance.consultation else None
                    ),
                }
                for ordonnance in ordonnances
            ]
            return JsonResponse({"ordonnances": ordonnances_list}, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def add_consultation_resume(request, consultation_id):

    if request.method == "POST":
        try:
            # Parse JSON body
            data = json.loads(request.body)
            resume = data.get("resume")

            if not resume:
                return JsonResponse({"error": "Resume field is required."}, status=400)

            # Retrieve the consultation
            consultation = get_object_or_404(Consultation, id=consultation_id)

            # Update the resume
            consultation.resume = resume
            consultation.save()

            return JsonResponse(
                {
                    "message": "Consultation resume updated successfully.",
                    "consultation_id": consultation.id,
                    "resume": consultation.resume,
                },
                status=200,
            )
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON payload."}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid HTTP method. Use POST."}, status=405)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    # Authenticate user
    auth = JWTAuthentication()
    try:
        user, _ = auth.authenticate(request)
    except AuthenticationFailed as e:
        return Response({'detail': str(e)}, status=401)

    if not user:
        return Response({'detail': 'Authentication credentials were not provided.'}, status=401)

    # Prepare user data
    user_data = {
        'id': user.id,
        'username': user.username,
        'role': user.role,
        # Add any other fields you want to expose
    }

    return Response(user_data)
