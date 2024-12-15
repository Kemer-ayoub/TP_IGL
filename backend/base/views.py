from django.http import JsonResponse
from .models import DPI
from .serializers import DPISerializer
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
        
        # If no ID is provided, return all DPIs
        #dpis = DPI.objects.all()
        #serializer = DPISerializer(dpis, many=True)
        #return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = DPISerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
