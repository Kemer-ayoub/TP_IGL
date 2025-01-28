
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
from rest_framework.parsers import MultiPartParser, FormParser

from .models import *
from .serializers import DPISerializer, AntecedantMedSerializer, ExamRequestSerializer, ReportRequestSerializer, OrdonnanceSerializer,BilanBiologiqueSerializer,BilanRadiologiqueSerializer,SoinSerializer, UserSerializer, Consultation, ConsultationSerializer, Ordonnance, OrdonnanceSerializer, Medicament, MedicamentSerializer, BilanBiologique, BilanRadiologique


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
    """
    Retrieve a list of available API routes.
    
    Returns:
        Response: A list of route strings.
    """
    routes = [
        "/api/token",
        "/api/token/refresh",
    ]
    return Response(routes)

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def dpi_list(request, pk=None, format=None):
    """
    Handle operations related to DPI (Dossier Patient Informatique).

    GET:
        Retrieve a specific DPI by the patient's ID.
        Parameters:
            pk (int): The ID of the patient associated with the DPI.
        Returns:
            Response: Serialized DPI data if found, or 404 if not found.

    POST:
        Create a new DPI record.
        Request Body:
            - nom (str): Last name of the patient.
            - prenom (str): First name of the patient.
            - mot_passe (str): Password for the patient.
            - date_naissance (str): Patient's date of birth (default: "2000-01-01").
            - adresse (str): Address of the patient.
            - telephone (str): Contact number of the patient.
            - nss (str): Social security number of the patient.
            - mutuelle (str): Insurance details (default: "adhesion").
            - num_pers_contact (str): Contact number for emergencies.
            - medecin_traitant (int): ID of the attending physician.
            - patient (int): ID of the patient user.
        Returns:
            Response: Serialized data of the created DPI on success or validation errors.
    """
    if request.method == "GET":
        if pk is not None:
            # Retrieve a specific DPI by ID
            dpi = get_object_or_404(DPI, patient=pk)
            serializer = DPISerializer(dpi)
            return Response(serializer.data)

    if request.method == "POST":
        print("Request Data:", request.data)
        mapped_data = {
            "nom": request.data.get("nom", ""),
            "prenom": request.data.get("prenom", ""),
            "mot_passe": request.data.get("mot_passe"),
            "date_naissance": request.data.get("date_naissance", "2000-01-01"),
            "adresse": request.data.get("adresse", ""),
            "telephone": request.data.get("telephone", ""),
            "nss": request.data.get("nss", ""),
            "mutuelle": request.data.get("mutuelle", "adhesion"),
            "num_pers_contact": request.data.get("num_pers_contact", ""),
            "medecin_traitant": request.data.get("medecin_traitant", None),
            "patient": request.data.get("patient", None),
        }
        print("Mapped Data:", mapped_data)
        serializer = DPISerializer(data=mapped_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_id(request):
    """
    Retrieve a user's details by their first name.

    GET:
        Query Parameters:
            - nom (str): The first name of the user to look up.
        Returns:
            Response: Serialized user data if found, or 404 if the user does not exist.
    """
    nom = request.GET.get('nom')
    if request.method == "GET":
        if nom:
            # Retrieve a specific user by first name
            user = get_object_or_404(User, first_name=nom)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_nom(request, pk=None, format=None):
    """
    Retrieve a user's details by their ID.

    GET:
        Query Parameters:
            - id (int): The unique ID of the user to look up.
        Returns:
            Response: Serialized user data if found, or 404 if the user does not exist.
    """
    id = request.GET.get('id')
    if request.method == "GET":
        if id:
            # Retrieve a specific user by ID
            user = get_object_or_404(User, id=id)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_patient_nss(request):
    """
    Retrieve a patient's details using their social security number (NSS).

    GET:
        Query Parameters:
            - nss (str): The social security number of the patient.
        Returns:
            - 200: Serialized patient details if the NSS matches an existing record.
            - 404: If no patient is found with the provided NSS.
    """
    nss = request.GET.get('nss')
    if request.method == "GET":
        if nss:
            # Retrieve a specific DPI by NSS
            dpi = get_object_or_404(DPI, nss=nss)
            serializer = DPISerializer(dpi)
            return Response(serializer.data)
        

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def antecedant_list(request):
    """
    Manage the list of medical antecedents.

    GET:
        Query Parameters:
            - dpi (int): The ID of the patient's DPI.
        Returns:
            - 200: A list of medical antecedents associated with the specified DPI.

    POST:
        Request Body:
            - Fields as per the `AntecedantMedSerializer`.
        Returns:
            - 201: The created antecedent if the data is valid.
            - 400: Validation errors if the data is invalid.
    """
    if request.method == "GET":
        dpi = request.GET.get('dpi')
        # Filter antecedents by the specific DPI ID
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
    """
    Manage exam requests.

    GET:
        Query Parameters:
            - id (int, optional): The ID of a specific exam request.
        Behavior:
            - If 'id' is provided, retrieves the specific exam request.
            - If 'id' is not provided, retrieves all exam requests.
        Returns:
            - 200: A list of all exam requests or the details of the specific exam request.

    POST:
        Request Body:
            - Fields as per the `ExamRequestSerializer`.
        Behavior:
            - Creates a new exam request with the provided data.
        Returns:
            - 201: The created exam request if the data is valid.
            - 400: Validation errors if the data is invalid.
    """
    if request.method == "GET":
        id = request.GET.get('id')  # Get the 'id' parameter from the request
        if id:  # If 'id' is present, fetch a specific ExamRequest
            exam_request = get_object_or_404(ExamRequest, id=id)
            serializer = ExamRequestSerializer(exam_request)
            return Response(serializer.data)
        else:  # Otherwise, fetch all ExamRequest instances
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
    """
    Manage report requests.

    GET:
        Query Parameters:
            - id (int, optional): The ID of a specific report request.
        Behavior:
            - If 'id' is provided, retrieves the specific report request.
            - If 'id' is not provided, retrieves all report requests.
        Returns:
            - 200: A list of all report requests or the details of the specific report request.

    POST:
        Request Body:
            - Fields as per the `ReportRequestSerializer`.
        Behavior:
            - Creates a new report request with the provided data.
        Returns:
            - 201: The created report request if the data is valid.
            - 400: Validation errors if the data is invalid.
    """
    if request.method == "GET":
        id = request.GET.get('id')  # Get the 'id' parameter from the request
        if id:  # If 'id' is present, fetch a specific ReportRequest
            report_request = get_object_or_404(ReportRequest, id=id)
            serializer = ReportRequestSerializer(report_request)
            return Response(serializer.data)
        else:  # Otherwise, fetch all ReportRequest instances
            report_requests = ReportRequest.objects.all()
            serializer = ReportRequestSerializer(report_requests, many=True)
            return Response(serializer.data)

    if request.method == "POST":
        print("So i'm love every night like it's the last time",request.data)
        serializer = ReportRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def valider_ordonnance(request):
    """
    Validate an ordonnance (prescription).

    PATCH:
        Query Parameters:
            - id (int, required): The ID of the ordonnance to validate.
        Request Body:
            - Fields as per the `OrdonnanceSerializer`, with the 'valid' field being forced to True.
        Behavior:
            - If 'id' is provided, updates the ordonnance to mark it as validated (valid = True).
        Returns:
            - 200: The updated ordonnance if the validation was successful.
            - 400: Validation errors if the data is invalid or the ordonnance could not be updated.
            - 404: If the ordonnance with the specified 'id' is not found.
    """
    id = request.GET.get('id')
    if request.method == "PATCH":
        if id:
            # Get specific ordonnance
            ordonnance = get_object_or_404(Ordonnance, id=id)
            request.data['valid'] = True  # Force the valid field to True
            serializer = OrdonnanceSerializer(ordonnance, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        @api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def list_soin(request, pk=None):
    if request.method == "GET":
        # If 'infirmier' parameter is provided, fetch a specific Soin instance by infirmier
        infirmier = request.GET.get('infirmier')
        if infirmier:
            soin = get_object_or_404(Soin, infirmier__id=infirmier)
            serializer = SoinSerializer(soin)
            return Response(serializer.data)
        
        # If 'dpi' parameter is provided, filter by dpi_id
        dpi = request.GET.get('dpi')
        if dpi:
            soins = Soin.objects.filter(dpi__id=dpi)
            serializer = SoinSerializer(soins, many=True)
            return Response(serializer.data)
        
        # If no specific filter is applied, return all Soins
        if pk:
            soin = get_object_or_404(Soin, pk=pk)
            serializer = SoinSerializer(soin)
            return Response(serializer.data)

        soins = Soin.objects.all()
        serializer = SoinSerializer(soins, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = SoinSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_bilan_biologique(request):
    """
    Create a new bilan biologique (biological report).

    POST:
        - Creates a new bilan biologique using the data provided in the request body.
        Request Body:
            - Fields as per the `BilanBiologiqueSerializer`.
        Returns:
            - 201: The created bilan biologique data if the request is valid.
            - 400: Validation errors if the data is invalid.
    """
    serializer = BilanBiologiqueSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_bilan_biologique(request, pk=None):
    """
    Retrieve a list of biological reports (bilan biologique).

    GET:
        - If `pk` is provided, retrieves a specific bilan biologique by its ID.
        - If no `pk` is provided, retrieves all bilan biologique instances.

    Parameters:
        - pk (optional): The ID of the specific bilan biologique to retrieve.

    Returns:
        - 200: A list of all bilan biologique records or a single record if `pk` is provided.
        - 404: If the requested bilan biologique with the given `pk` is not found.
    """
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
    """
    Add a new radiological report (bilan radiologique).

    POST:
        - Accepts a `multipart/form-data` request containing the data for the radiological report.
        - Saves the provided data as a new bilan radiologique entry.

    Parameters:
        - request.data: The data for the new bilan radiologique (e.g., images, details).
    
    Returns:
        - 201: Successfully created bilan radiologique.
        - 400: Invalid data provided.
    
    Note:
        - Uses `MultiPartParser` and `FormParser` for handling file uploads in `multipart/form-data`.
    """
    parser_classes = [MultiPartParser, FormParser]  # Required for handling multipart/form-data
    serializer = BilanRadiologiqueSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_bilan_radiologique(request, pk=None):
    """
    List radiological reports (bilans radiologiques).

    GET:
        - Fetch all radiological reports if `pk` is not provided.
        - Fetch a specific radiological report by its ID if `pk` is provided.

    Parameters:
        - pk (optional): The ID of a specific radiological report to retrieve.

    Returns:
        - 200: A list of all bilans radiologiques or a single bilan if `pk` is provided.
        - 404: If the specific bilan radiologique with the given ID does not exist.

    Notes:
        - Requires authentication via IsAuthenticated permission class.
    """
    if pk is not None:
        bilan = get_object_or_404(BilanRadiologique, pk=pk)
        serializer = BilanRadiologiqueSerializer(bilan)
        return Response(serializer.data)
    bilans = BilanRadiologique.objects.all()
    serializer = BilanRadiologiqueSerializer(bilans, many=True)
    return Response(serializer.data)

@csrf_exempt
def get_patient_by_social_security_number(request):
    """
    Retrieve a patient's information based on their social security number (NSS).

    POST:
        - Accepts a JSON body with the NSS (social security number).
        - If a matching DPI (Dossier Patient Informatisé) is found, returns relevant patient details.
        - Returns an error message if the NSS is missing or invalid.

    Parameters:
        - nss (str): The social security number of the patient to search for.

    Returns:
        - 200: A JSON response with the patient's data if a matching DPI is found.
        - 400: If the request body is not valid JSON or the NSS is missing.
        - 404: If no matching DPI is found.

    Notes:
        - Requires a POST request with JSON body.
        - Exempt from CSRF verification.
    """
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
    
 @api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def consultation_list(request, pk=None):
    """
    List and create consultations.

    GET:
        - Fetches all consultations related to a specific patient (DPI) or a specific consultation by ID.
        - Accepts query parameters:
            - id (int): Fetch a specific consultation by its ID.
            - dpi (int): Fetch consultations related to a specific patient (via their DPI).

    POST:
        - Creates a new consultation entry.
        - Expects data in the request body, including:
            - dpi (int): The patient related to the consultation.
            - Other consultation-related details.

    Parameters:
        - id (int): The ID of the consultation to retrieve.
        - dpi (int): The DPI of the patient to filter consultations by.

    Returns:
        - 200: A JSON response containing consultation details.
        - 201: A JSON response with the newly created consultation data.
        - 400: If the request data is invalid or missing necessary fields.
        - 404: If the consultation or DPI does not exist.

    Notes:
        - Requires an authenticated user.
    """
    if request.method == "GET":
        id = request.GET.get('id')  # Get the 'id' parameter from the request
        if id:  # If 'id' is present, fetch a specific Consultation
            consultation = get_object_or_404(Consultation, id=id)
            serializer = ConsultationSerializer(consultation)
            return Response(serializer.data)
        else:  # Otherwise, fetch all Consultation instances
            dpi = request.GET.get('dpi')
            # Filter consultations by the specific dpi_id
            consultations = Consultation.objects.filter(dpi__id=dpi)
            serializer = ConsultationSerializer(consultations, many=True)
            return Response(serializer.data)

    if request.method == "POST":
        data = request.data
        dpi_id = get_object_or_404(DPI, patient=data.get("dpi"))
        data["dpi"] = dpi_id.id
        serializer = ConsultationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def ordonnance_list(request, pk=None):
    """
    List and create ordonnances (prescriptions) along with associated medicaments.

    GET:
        - Fetches all ordonnances or a specific ordonnance by ID.
        - Optionally filters ordonnances by consultation ID.
        - Accepts query parameters:
            - id (int): Fetch a specific ordonnance by its ID.
            - cons_id (int): Fetch ordonnances related to a specific consultation.

    POST:
        - Creates a new ordonnance with associated medicaments.
        - Expects data in the request body, including:
            - valid (bool): Indicates if the ordonnance is valid (default is False).
            - consultation (int): The consultation associated with the ordonnance.
            - patient_name (str): The patient's name.
            - patient_age (int): The patient's age.
            - medecin (str): The prescribing doctor.
            - medicaments (list): A list of medicament data to associate with the ordonnance.

    Parameters:
        - id (int): The ID of the ordonnance to retrieve.
        - cons_id (int): The consultation ID to filter ordonnances by.
        
    Returns:
        - 200: A JSON response containing ordonnance data.
        - 201: A JSON response with the newly created ordonnance and associated medicaments.
        - 400: If the request data is invalid or missing necessary fields.
        - 500: If an internal server error occurs (e.g., unexpected exception).

    Notes:
        - Requires an authenticated user.
        - In the POST method, the medicaments are created only if they are valid. If any medicament is invalid, the ordonnance is rolled back.
    """
    if request.method == "GET":
        id = request.GET.get('id')  # Get the 'id' parameter from the request
        if id:  # If 'id' is present, fetch a specific Ordonnance
            ordonnance = get_object_or_404(Ordonnance, id=id)
            serializer = OrdonnanceSerializer(ordonnance)
            return Response(serializer.data)
        else:  # Otherwise, fetch all Ordonnance instances
            print("123")
            cons_id = request.GET.get('cons_id')
            if cons_id:
                print("456")
                # Filter ordonnances by the specific cons_id_id
                ordonnances = Ordonnance.objects.filter(consultation_id=cons_id)
                print("789")
                serializer = OrdonnanceSerializer(ordonnances, many=True)
                return Response(serializer.data)
            else:
                ordonnance = Ordonnance.objects.all()
                serializer = OrdonnanceSerializer(ordonnance, many=True)
                return Response(serializer.data)

    if request.method == "POST":
        try:
            # Extract ordonnance data
            ordonnance_data = {
                'valid': request.data.get('valid', False),
                'consultation': request.data.get('consultation'),
                'patient_name': request.data.get('patient_name'),
                'patient_age': request.data.get('patient_age'),
                'medecin': request.data.get('medecin')
            }
            
            # Create Ordonnance instance
            ordonnance_serializer = OrdonnanceSerializer(data=ordonnance_data)
            if ordonnance_serializer.is_valid():
                ordonnance = ordonnance_serializer.save()
                
                # Extract medicaments data
                medicaments_data = request.data.get('medicaments', [])
                
                # Create Medicament instances
                medicaments = []
                for med_data in medicaments_data:
                    med_data['ordonnance'] = ordonnance.id
                    medicament_serializer = MedicamentSerializer(data=med_data)
                    if medicament_serializer.is_valid():
                        medicament_serializer.save()
                        medicaments.append(medicament_serializer.data)
                    else:
                        ordonnance.delete()
                        return Response(
                            medicament_serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST
                        )
                
                # Return combined response
                response_data = {
                    'ordonnance': ordonnance_serializer.data,
                    'medicaments': medicaments
                }
                return Response(response_data, status=status.HTTP_201_CREATED)
            
            return Response(
                ordonnance_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )    
"""
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_consultation(request):
    """
    """
    Add a new consultation to the system.

    POST:
        - Adds a new consultation associated with a specific patient (DPI) and doctor (Medecin).
        - Expects a JSON body with the following fields:
            - dpi_id (int): The ID of the patient (DPI).
            - medecin_id (int): The ID of the doctor (Medecin).
            - date_cons (str): The date of the consultation in the format "YYYY-MM-DD".
            - diagnostic (str): The diagnostic provided during the consultation.
            - resume (str): A summary of the consultation.

    Request Body Example:
    {
        "dpi_id": 123,
        "medecin_id": 456,
        "date_cons": "2025-01-28",
        "diagnostic": "Common cold",
        "resume": "Patient presenting symptoms of a cold."
    }

    Returns:
        - 201: JSON response with a success message if the consultation is created.
        - 400: If required fields are missing or invalid data is provided (e.g., incorrect date format).
        - 404: If the specified `medecin_id` or `dpi_id` does not exist.
        - 405: If the request method is not POST.

    Notes:
        - The `medecin_id` should reference a valid doctor, and the `dpi_id` should reference an existing patient.
        - The date of consultation should follow the format "YYYY-MM-DD".
    """
    """
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

            # Validate that medecin and dpi exist
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
    """
    List all consultations or fetch a specific consultation by ID.

    GET:
        - Fetches a specific consultation if an ID is provided as a URL parameter.
        - If no ID is provided, fetches all consultations in the system.

    Query Parameters:
        - consultation_id (optional): The ID of the consultation to retrieve. If not provided, all consultations will be returned.

    Request Example:
        - GET /consultations/ (fetches all consultations)
        - GET /consultations/1/ (fetches consultation with ID 1)

    Returns:
        - 200 OK: A JSON response containing the list of consultations or the details of a specific consultation.
        - 404 Not Found: If a specific consultation with the provided ID does not exist.

    Response Format (for a specific consultation):
    {
        "id": 1,
        "medecin": "Dr. John Doe",
        "date_cons": "2025-01-28",
        "diagnostic": "Common cold",
        "resume": "Patient presenting symptoms of a cold.",
        "dpi": "John Doe"
    }

    Response Format (for all consultations):
    [
        {
            "id": 1,
            "medecin": "Dr. John Doe",
            "date_cons": "2025-01-28",
            "diagnostic": "Common cold",
            "resume": "Patient presenting symptoms of a cold.",
            "dpi": "John Doe"
        },
        {
            "id": 2,
            "medecin": "Dr. Jane Smith",
            "date_cons": "2025-01-29",
            "diagnostic": "Flu",
            "resume": "Patient showing flu-like symptoms.",
            "dpi": "Jane Smith"
        }
    ]
    """
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
    """
    """
    Create a new Ordonnance for a specific Consultation and add associated medications.

    POST:
        - Creates an Ordonnance (prescription) for a given Consultation by its ID.
        - The request should include a list of medications in JSON format under the 'medications' field.
        - Each medication should include the fields 'name', 'dosage', and 'duration'.
        - The Ordonnance is initially marked as invalid (valid=False) when created.

    Path Parameters:
        - consultation_id (int): The ID of the Consultation for which the Ordonnance is being created.

    Request Body Example:
        {
            "medications": [
                {
                    "name": "Paracetamol",
                    "dosage": "500mg",
                    "duration": "7 days"
                },
                {
                    "name": "Ibuprofen",
                    "dosage": "200mg",
                    "duration": "5 days"
                }
            ]
        }

    Response:
        - 200 OK: If the Ordonnance is created successfully, returns a message with the ordonnance ID.
        - 400 Bad Request: If the medications are missing or invalid.
        - 500 Internal Server Error: If there is an exception while processing the request.

    Response Example (on success):
    {
        "message": "Ordonnance created successfully.",
        "ordonnance_id": 123
    }

    Response Example (on error):
    {
        "error": "No medications provided."
    }
    """
    """
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
def list_ordonnance(request, ordonnance_id=None):"""
    """
    List and retrieve Ordonnances. Optionally, fetch a specific Ordonnance by ID.

    GET:
        - If an `ordonnance_id` is provided in the URL, fetches a specific Ordonnance and its associated medications.
        - If no `ordonnance_id` is provided, retrieves a list of all Ordonnances.

    Path Parameters:
        - ordonnance_id (int, optional): The ID of the Ordonnance to retrieve.

    Request Parameters (Query Parameters):
        - None required. The `ordonnance_id` is passed in the URL.

    Response:
        - 200 OK: On success, returns a JSON object with Ordonnances data.
        - 500 Internal Server Error: If an error occurs while processing the request.

    Response Example (on success, specific Ordonnance):
    {
        "id": 123,
        "date": "2025-01-28",
        "valid": false,
        "consultation_id": 456,
        "medications": [
            {
                "name": "Paracetamol",
                "dosage": "500mg",
                "duration": "7 days"
            },
            {
                "name": "Ibuprofen",
                "dosage": "200mg",
                "duration": "5 days"
            }
        ]
    }

    Response Example (on success, list of all Ordonnances):
    {
        "ordonnances": [
            {
                "id": 123,
                "date": "2025-01-28",
                "valid": false,
                "consultation_id": 456
            },
            {
                "id": 124,
                "date": "2025-01-29",
                "valid": true,
                "consultation_id": 457
            }
        ]
    }

    Response Example (on error):
    {
        "error": "Error message detailing the issue."
    }
    """
    """"
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
        """
    

    @csrf_exempt
def add_consultation_resume(request, consultation_id):
    """
    Update the resume of a Consultation.

    POST:
        - Updates the `resume` field of an existing consultation with the specified `consultation_id`.

    Path Parameters:
        - consultation_id (int): The ID of the Consultation whose resume is to be updated.

    Request Body (JSON):
        - resume (string): The new resume for the consultation.

    Response:
        - 200 OK: Returns a success message with updated consultation details.
        - 400 Bad Request: If the `resume` field is missing or if there is an issue with the JSON format.
        - 500 Internal Server Error: If an unexpected error occurs.

    Response Example (on success):
    {
        "message": "Consultation resume updated successfully.",
        "consultation_id": 123,
        "resume": "Updated consultation resume text."
    }

    Response Example (on error):
    {
        "error": "Error message detailing the issue."
    }
    """
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
    """
    Retrieve the authenticated user's information.

    GET:
        - Authenticates the user based on JWT authentication.
        - Returns the user's information, such as the ID, username, and role.

    Authentication:
        - The user must be authenticated with a valid JWT token in the request headers.

    Response:
        - 200 OK: Returns the user's information.
        - 401 Unauthorized: If the authentication fails or no credentials are provided.

    Response Example (on success):
    {
        "id": 1,
        "username": "john_doe",
        "role": "admin"
    }

    Response Example (on error):
    {
        "detail": "Authentication credentials were not provided."
    }
    """
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
