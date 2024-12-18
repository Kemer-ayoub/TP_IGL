from django.http import JsonResponse
from .models import DPI, AntecedantMed, ExamRequest, ReportRequest, Ordonnance
from .serializers import DPISerializer, AntecedantMedSerializer, ExamRequestSerializer, ReportRequestSerializer, OrdonnanceSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims to the token
        token['username'] = user.username
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def dpi_list(request, pk=None, format=None):
    if request.method == 'GET':
        if pk is not None:
            # Retrieve a specific DPI by ID
            dpi = get_object_or_404(DPI, pk=pk)
            serializer = DPISerializer(dpi)
            return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = DPISerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def antecedant_list(request):
    if request.method == 'GET':
        # Get all antecedants
        antecedants = AntecedantMed.objects.all()
        serializer = AntecedantMedSerializer(antecedants, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = AntecedantMedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def examrequests_list(request, pk=None):
    if request.method == 'GET':
        if pk is not None:
            # Get specific antecedant
            exam_request = get_object_or_404(ExamRequest, pk=pk)
            serializer = ExamRequestSerializer(exam_request)
            return Response(serializer.data)
        
        # Get all antecedants
        exam_requests = ExamRequest.objects.all()
        serializer = ExamRequestSerializer(exam_requests, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = ExamRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def reportrequests_list(request, pk=None):
    if request.method == 'GET':
        if pk is not None:
            # Get specific antecedant
            report_request = get_object_or_404(ReportRequest, pk=pk)
            serializer = ReportRequestSerializer(report_request)
            return Response(serializer.data)
        
        # Get all antecedants
        report_requests = ReportRequest.objects.all()
        serializer = ReportRequestSerializer(report_requests, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = ReportRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
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
